import type { DropdownOption } from "gestalt";
import { Box, Button, Dropdown, Flex, IconButton, Tooltip } from "gestalt";
import type { LexicalEditor } from "lexical";
import { DEPRECATED_$isGridSelection } from "lexical";

import type { HeadingTagType } from "@lexical/rich-text";
import { $createHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { useEffect, useRef, useState } from "react";

import VerticalDivider from "~/components/VerticalDivider";
import {
  boldIconPath,
  italicIconPath,
  strikeThroughIconPath,
} from "~/icon/iconPaths";
import { NewPostLayerZIndex } from "~/routes/index/reader/zIndex";

import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { blockTypeToBlockName } from "../ToolbarPlugin";

export default function BoldToCode({
  blockType,
  editor,
  activeEditor,
  isBold,
  isCode,
  isItalic,
  isStrikethrough,
}: {
  blockType: keyof typeof blockTypeToBlockName;
  editor: LexicalEditor;
  activeEditor: LexicalEditor;
  isBold: boolean;
  isItalic: boolean;
  isStrikethrough: boolean;
  isCode: boolean;
}) {
  return (
    <Flex justifyContent="between">
      {blockType in blockTypeToBlockName && editor && (
        <Box>
          <BlockFormatDropDown blockType={blockType} editor={editor} />
        </Box>
      )}
      <VerticalDivider />
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
        />
      </Tooltip>
    </Flex>
  );
}

function BlockFormatDropDown({
  editor,
  blockType,
}: {
  blockType: keyof typeof blockTypeToBlockName;
  editor: LexicalEditor;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const label =
    Object.entries(blockTypeToBlockName).find(
      ([key]) => key === blockType
    )?.[1] ?? "";
  const [selected, setSelected] = useState<DropdownOption | undefined>({
    label,
    value: blockType,
  });

  useEffect(() => {
    setSelected({
      label,
      value: blockType,
    });
    //@ts-ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockType]);

  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        )
          $setBlocksType(selection, () => $createParagraphNode());
      });
    }
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
  };

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

  return (
    <>
      <Button
        accessibilityControls="truncation-dropdown-example"
        accessibilityExpanded={open}
        accessibilityHaspopup
        iconEnd="arrow-down"
        onClick={() => setOpen((prevVal) => !prevVal)}
        ref={anchorRef}
        size="lg"
        color="white"
        selected={open}
        text="Style"
      />
      {open && (
        <Dropdown
          zIndex={NewPostLayerZIndex}
          anchor={anchorRef.current}
          id="truncation-dropdown-example"
          onDismiss={() => setOpen(false)}
        >
          <Dropdown.Item
            onSelect={({ item }) => {
              formatParagraph();
              setSelected(item);
              setOpen(false);
            }}
            option={{
              label: blockTypeToBlockName["paragraph"],
              value: "paragraph",
            }}
            selected={selected}
          />
          <Dropdown.Item
            onSelect={({ item }) => {
              formatHeading("h1");
              setSelected(item);
              setOpen(false);
            }}
            option={{ label: blockTypeToBlockName["h1"], value: "h1" }}
            selected={selected}
          />
          <Dropdown.Item
            onSelect={({ item }) => {
              formatHeading("h2");
              setSelected(item);
              setOpen(false);
            }}
            option={{ label: blockTypeToBlockName["h2"], value: "h2" }}
            selected={selected}
          />
          <Dropdown.Item
            option={{ label: blockTypeToBlockName["h3"], value: "h3" }}
            onSelect={({ item }) => {
              formatHeading("h3");
              setSelected(item);
              setOpen(false);
            }}
            selected={selected}
          />

          <Dropdown.Item
            option={{ label: blockTypeToBlockName["bullet"], value: "bullet" }}
            onSelect={({ item }) => {
              formatBulletList();
              setSelected(item);
              setOpen(false);
            }}
            selected={selected}
          />
          <Dropdown.Item
            option={{ label: blockTypeToBlockName["number"], value: "number" }}
            onSelect={({ item }) => {
              formatNumberedList();
              setSelected(item);
              setOpen(false);
            }}
            selected={selected}
          />
        </Dropdown>
      )}
    </>
  );
}
