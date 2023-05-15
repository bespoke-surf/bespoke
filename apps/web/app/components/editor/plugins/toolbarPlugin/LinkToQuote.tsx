import { $createQuoteNode } from "@lexical/rich-text";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Layer,
  Link,
  Popover,
  Text,
  TextField,
  Tooltip,
} from "gestalt";
import type {
  GridSelection,
  LexicalEditor,
  NodeSelection,
  RangeSelection,
} from "lexical";
import {
  $getSelection,
  $isRangeSelection,
  DEPRECATED_$isGridSelection,
} from "lexical";
import { Suspense, lazy, useCallback, useState } from "react";
import { quoteIconPath } from "../../../../icon/iconPaths";
import { NewPostLayerZIndex } from "../../../../routes/index/reader/zIndex";
import type { blockTypeToBlockName } from "../ToolbarPlugin";

import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $setBlocksType } from "@lexical/selection";
import { mergeRegister } from "@lexical/utils";
import { COMMAND_PRIORITY_LOW, SELECTION_CHANGE_COMMAND } from "lexical";
import { useEffect, useRef } from "react";
import { sanitizeUrl } from "../../../../utils/sanitizeUrl";
import { getSelectedNode } from "./getSelectedNode";

const UploadImage = lazy(() => import("./linkToQuote/UploadImage"));

export default function LinkToQuote({
  blockType,
  isLink,
  editor,
  activeEditor,
}: {
  blockType: keyof typeof blockTypeToBlockName;
  isLink: boolean;
  editor: LexicalEditor;
  activeEditor: LexicalEditor;
}) {
  const [openModals, setOpenModals] = useState(false);

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

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl("https://"));
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  return (
    <>
      <Flex justifyContent="between">
        <Tooltip
          idealDirection="down"
          zIndex={NewPostLayerZIndex}
          text="Link"
          accessibilityLabel="link"
        >
          <IconButton
            accessibilityLabel="link"
            icon="link"
            iconColor="darkGray"
            selected={isLink}
            onClick={insertLink}
          />
        </Tooltip>
        <Tooltip
          idealDirection="down"
          zIndex={NewPostLayerZIndex}
          text="Upload image"
          accessibilityLabel="insert image"
        >
          <IconButton
            accessibilityLabel="link"
            icon="camera-roll"
            iconColor="darkGray"
            onClick={() => {
              setOpenModals(true);
            }}
            selected={openModals}
          />
        </Tooltip>
        <Tooltip
          idealDirection="down"
          zIndex={NewPostLayerZIndex}
          text="Quote"
          accessibilityLabel="Quote"
        >
          <IconButton
            accessibilityLabel="link"
            iconColor="darkGray"
            onClick={formatQuote}
            dangerouslySetSvgPath={{
              __path: quoteIconPath,
            }}
            selected={blockType === "quote"}
          />
        </Tooltip>
      </Flex>

      {isLink && <FloatingLinkEditor editor={activeEditor} />}

      <Suspense fallback={null}>
        <UploadImage
          open={openModals}
          close={() => setOpenModals(false)}
          editor={editor}
        />
      </Suspense>
    </>
  );
}

function positionEditorElement(
  editor: HTMLElement,
  rect: ClientRect | null,
  rootElement: HTMLElement
): void {
  if (rect === null) {
    editor.style.opacity = "0";
    editor.style.top = "-1000px";
    editor.style.left = "-1000px";
  } else {
    editor.style.opacity = "1";
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
    const left = rect.left - editor.offsetWidth / 2 + rect.width / 2;
    const rootElementRect = rootElement.getBoundingClientRect();
    if (rootElementRect.left > left) {
      editor.style.left = `${rect.left + window.pageXOffset}px`;
    } else if (left + editor.offsetWidth > rootElementRect.right) {
      editor.style.left = `${
        rect.right + window.pageXOffset - editor.offsetWidth
      }px`;
    }
  }
}

function FloatingLinkEditor({
  editor,
}: {
  editor: LexicalEditor;
}): JSX.Element {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState<
    RangeSelection | GridSelection | NodeSelection | null
  >(null);

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl("");
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      nativeSelection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection.getRangeAt(0);
      let rect;
      if (nativeSelection.anchorNode === rootElement) {
        let inner = rootElement;
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild as HTMLElement;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange.getBoundingClientRect();
      }

      positionEditorElement(editorElem, rect, rootElement);
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== "link-input") {
      if (rootElement !== null) {
        positionEditorElement(editorElem, null, rootElement);
      }
      setLastSelection(null);
      setEditMode(false);
      setLinkUrl("");
    }

    return true;
  }, [editor]);

  useEffect(() => {
    const onResize = () => {
      editor.getEditorState().read(() => {
        updateLinkEditor();
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return true;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <>
      <Box ref={editorRef} position="absolute" width="100%" />
      <Layer zIndex={NewPostLayerZIndex}>
        <Popover
          anchor={editorRef.current}
          id="link-popover"
          idealDirection="down"
          onDismiss={() => undefined}
          positionRelativeToAnchor={true}
          size="md"
        >
          <Box padding={2}>
            {isEditMode ? (
              <Flex direction="column" gap={2}>
                <TextField
                  id="linkUrl"
                  autoComplete="off"
                  size="lg"
                  ref={inputRef}
                  value={linkUrl}
                  onChange={({ value }) => {
                    setLinkUrl(value);
                  }}
                  onKeyDown={({ event }) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      if (lastSelection !== null) {
                        if (linkUrl !== "") {
                          editor.dispatchCommand(
                            TOGGLE_LINK_COMMAND,
                            sanitizeUrl(linkUrl)
                          );
                        }
                      }
                      setEditMode(false);
                    } else if (event.key === "Escape") {
                      event.preventDefault();
                      setEditMode(false);
                    }
                  }}
                />
                <Button
                  accessibilityLabel="done"
                  text="Update"
                  color="red"
                  onClick={() => {
                    if (lastSelection !== null) {
                      if (linkUrl !== "") {
                        editor.dispatchCommand(
                          TOGGLE_LINK_COMMAND,
                          sanitizeUrl(linkUrl)
                        );
                      }
                    }
                    setEditMode(false);
                  }}
                />
              </Flex>
            ) : (
              <Flex
                direction="row"
                alignItems="center"
                justifyContent="between"
                gap={2}
              >
                <Box padding={2}>
                  <Link href={linkUrl} target="blank">
                    <Text lineClamp={10} inline underline>
                      {linkUrl}
                    </Text>
                  </Link>
                </Box>
                <IconButton
                  accessibilityLabel="edit"
                  icon="edit"
                  iconColor="darkGray"
                  bgColor="lightGray"
                  onClick={() => {
                    setEditMode(true);
                  }}
                />
              </Flex>
            )}
          </Box>
        </Popover>
      </Layer>
    </>
  );
}
