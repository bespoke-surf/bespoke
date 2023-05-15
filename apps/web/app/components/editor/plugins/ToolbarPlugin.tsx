import { Flex, SelectList } from "gestalt";
import type { NodeKey } from "lexical";

import { $isCodeNode, CODE_LANGUAGE_FRIENDLY_NAME_MAP } from "@lexical/code";
import { $isLinkNode } from "@lexical/link";
import { $isListNode, ListNode } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isHeadingNode } from "@lexical/rich-text";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import type { ElementFormatType } from "lexical";
import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useCallback, useEffect, useState } from "react";
import VerticalDivider from "~/components/VerticalDivider";
import Align from "./toolbarPlugin/Align";
import BoldToCode from "./toolbarPlugin/BoldToCode";
import { getSelectedNode } from "./toolbarPlugin/getSelectedNode";
import InsertButton from "./toolbarPlugin/InsertButton";
import LinkToQuote from "./toolbarPlugin/LinkToQuote";
import UndoRedo from "./toolbarPlugin/UndoRedo";
export const blockTypeToBlockName = {
  bullet: "Bullet List",
  check: "Check List",
  code: "Code Block",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
};

function getCodeLanguageOptions(): JSX.Element[] {
  const options: JSX.Element[] = [];

  for (const [lang, friendlyName] of Object.entries(
    CODE_LANGUAGE_FRIENDLY_NAME_MAP
  )) {
    options.push(<SelectList.Option label={friendlyName} value={lang} />);
  }

  return options;
}

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

export default function ToolbarPlugin({
  disableButtons = false,
  disableProduct = false,
  disableShare = false,
}: {
  disableButtons?: boolean;
  disableProduct?: boolean;
  disableShare?: boolean;
}): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [formatType, setFormatType] = useState<ElementFormatType>("");
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>("paragraph");
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(
    null
  );
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      setFormatType(element.getFormatType());
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName);
          }

          // if ($isCodeNode(element)) {
          //   const language =
          //     element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
          //   // setCodeLanguage(
          //   //   language ? CODE_LANGUAGE_MAP[language] || language : ""
          //   // );
          //   return;
          // }
        }
      }
    }
  }, [activeEditor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [activeEditor, updateToolbar]);

  const onCodeLanguageSelect = useCallback(
    ({ value }: { value: string }) => {
      activeEditor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(value);
          }
        }
      });
    },
    [activeEditor, selectedElementKey]
  );

  return (
    <>
      <Flex alignItems="stretch" direction="row" justifyContent="between" wrap>
        <UndoRedo
          activeEditor={activeEditor}
          canRedo={canRedo}
          canUndo={canUndo}
        />
        <VerticalDivider />

        {blockType === "code" ? (
          <>
            <SelectList
              id="code-language"
              onChange={onCodeLanguageSelect}
              size="lg"
            >
              {CODE_LANGUAGE_OPTIONS}
            </SelectList>
          </>
        ) : (
          <>
            <BoldToCode
              activeEditor={activeEditor}
              editor={editor}
              blockType={blockType}
              isBold={isBold}
              isCode={isCode}
              isItalic={isItalic}
              isStrikethrough={isStrikethrough}
            />
            <VerticalDivider />

            <LinkToQuote
              activeEditor={activeEditor}
              editor={editor}
              isLink={isLink}
              blockType={blockType}
            />
            <VerticalDivider />

            <Align activeEditor={activeEditor} formatType={formatType} />
            <VerticalDivider />
            <InsertButton
              activeEditor={activeEditor}
              editor={editor}
              blockType={blockType}
              disableButtons={disableButtons}
              disableProduct={disableProduct}
              disableShare={disableShare}
            />
          </>
        )}
      </Flex>
    </>
  );
}
