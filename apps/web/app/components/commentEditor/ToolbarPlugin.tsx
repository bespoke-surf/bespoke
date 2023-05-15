import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createQuoteNode, $isHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from "@lexical/utils";
import { Box, IconButton, Tooltip } from "gestalt";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  DEPRECATED_$isGridSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useCallback, useEffect, useState } from "react";
import {
  boldIconPath,
  italicIconPath,
  numberListPath,
  quoteIconPath,
  strikeThroughIconPath,
} from "../../icon/iconPaths";
import { NewPostLayerZIndex } from "../../routes/index/reader/zIndex";
import VerticalDivider from "../VerticalDivider";
import { blockTypeToBlockName } from "../editor/plugins/ToolbarPlugin";

export const CommentEditorToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);

  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>("paragraph");

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));

      // Update links

      if (elementDOM !== null) {
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
        }
      }
      // Handle buttons
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
      })
    );
  }, [activeEditor, editor, updateToolbar]);

  const formatBulletList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };
  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      });
    }
  };

  return (
    <Box
      display="flex"
      color="elevationAccent"
      padding={1}
      borderStyle="raisedTopShadow"
      alignItems="center"
      direction="row"
      justifyContent="start"
      wrap
      dangerouslySetInlineStyle={{
        __style: {
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        },
      }}
    >
      <Tooltip
        idealDirection="down"
        zIndex={NewPostLayerZIndex}
        text="Bold"
        accessibilityLabel="bold"
      >
        <IconButton
          accessibilityLabel="bold"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          }}
          selected={isBold}
          dangerouslySetSvgPath={{
            __path: boldIconPath,
          }}
          iconColor="darkGray"
          size="md"
        />
      </Tooltip>
      <Tooltip
        idealDirection="down"
        zIndex={NewPostLayerZIndex}
        text="Italic"
        accessibilityLabel="Italic"
      >
        <IconButton
          accessibilityLabel="italic"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
          }}
          selected={isItalic}
          dangerouslySetSvgPath={{
            __path: italicIconPath,
          }}
          iconColor="darkGray"
          size="md"
        />
      </Tooltip>
      <Tooltip
        idealDirection="down"
        zIndex={NewPostLayerZIndex}
        text="Strikethrough"
        accessibilityLabel="strikethrough"
      >
        <IconButton
          accessibilityLabel="link"
          iconColor="darkGray"
          selected={isStrikethrough}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
          }}
          dangerouslySetSvgPath={{
            __path: strikeThroughIconPath,
          }}
          size="md"
        />
      </Tooltip>
      <Tooltip
        idealDirection="down"
        zIndex={NewPostLayerZIndex}
        text="Code"
        accessibilityLabel="code"
      >
        <IconButton
          accessibilityLabel="link"
          iconColor="darkGray"
          selected={isCode}
          icon="code"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
          }}
          size="md"
        />
      </Tooltip>
      <VerticalDivider />

      {blockType in blockTypeToBlockName && activeEditor === editor && (
        <>
          <Tooltip
            idealDirection="down"
            zIndex={NewPostLayerZIndex}
            text="Bullet List"
            accessibilityLabel="code"
          >
            <IconButton
              accessibilityLabel="link"
              iconColor="darkGray"
              selected={blockType === "bullet"}
              icon="terms"
              onClick={formatBulletList}
              size="md"
            />
          </Tooltip>

          <Tooltip
            idealDirection="down"
            zIndex={NewPostLayerZIndex}
            text="Numbered List"
            accessibilityLabel="code"
          >
            <IconButton
              accessibilityLabel="link"
              iconColor="darkGray"
              selected={blockType === "number"}
              dangerouslySetSvgPath={{
                __path: numberListPath,
              }}
              onClick={formatNumberedList}
              size="md"
            />
          </Tooltip>
          <Tooltip
            idealDirection="down"
            zIndex={NewPostLayerZIndex}
            text="Quote"
            accessibilityLabel="code"
          >
            <IconButton
              accessibilityLabel="link"
              iconColor="darkGray"
              onClick={formatQuote}
              dangerouslySetSvgPath={{
                __path: quoteIconPath,
              }}
              selected={blockType === "quote"}
              size="md"
            />
          </Tooltip>
        </>
      )}
    </Box>
  );
};
