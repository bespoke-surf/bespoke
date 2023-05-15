/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { LexicalCommand, LexicalEditor } from "lexical";
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  FORMAT_ELEMENT_COMMAND,
} from "lexical";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils";
import {
  $createRangeSelection,
  $getSelection,
  $isNodeSelection,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
} from "lexical";
import { useEffect } from "react";

import type { ImagePayload } from "../nodes/ImageNode";
import { $createImageNode, $isImageNode, ImageNode } from "../nodes/ImageNode";

export type InsertImagePayload = Readonly<ImagePayload>;

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
  createCommand("INSERT_IMAGE_COMMAND");
export default function ImagesPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagesPlugin: ImageNode not registered on editor");
    }

    return mergeRegister(
      editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          // const selection = $getSelection();

          // if ($isRangeSelection(selection)) {
          //   if ($isRootNode(selection.anchor.getNode())) {
          //     selection.insertParagraph();
          //   }
          //   const paragraph = $createParagraphNode();
          //   editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
          //   selection.insertNodes([imageNode, paragraph]);
          //   // selection.focus.getNode().insertAfter(imageNode);
          // }
          const imageNode = $createImageNode(payload);
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
          $insertNodes([imageNode]);
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
          }

          // selection.insertNodes([imageNode]);

          // const focusNode = selection.focus.getNode();
          // if (focusNode !== null) {
          //   const imageNode = $createImageNode(payload);
          //   selection.insertParagraph();
          //   editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
          //   selection.focus
          //     .getNode()
          //     .getTopLevelElementOrThrow()
          //     .insertBefore(imageNode);

          // }
          return true;
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand<DragEvent>(
        DRAGSTART_COMMAND,
        (event) => {
          return onDragStart(event);
        },
        COMMAND_PRIORITY_HIGH
      ),
      editor.registerCommand<DragEvent>(
        DRAGOVER_COMMAND,
        (event) => {
          return onDragover(event);
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<DragEvent>(
        DROP_COMMAND,
        (event) => {
          return onDrop(event, editor);
        },
        COMMAND_PRIORITY_HIGH
      )
    );
  }, [editor]);

  return null;
}

const TRANSPARENT_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function onDragStart(event: DragEvent): boolean {
  if (window) {
    const img = window.document.createElement("img");
    img.src = TRANSPARENT_IMAGE;

    const node = getImageNodeInSelection();
    if (!node) {
      return false;
    }
    const dataTransfer = event.dataTransfer;
    if (!dataTransfer) {
      return false;
    }
    dataTransfer.setData("text/plain", "_");
    dataTransfer.setDragImage(img, 0, 0);
    dataTransfer.setData(
      "application/x-lexical-drag",
      JSON.stringify({
        data: {
          altText: node.__altText,
          caption: node.__caption,
          height: node.__height,
          key: node.getKey(),
          maxWidth: node.__maxWidth,
          showCaption: node.__showCaption,
          src: node.__src,
          width: node.__width,
        },
        type: "image",
      })
    );

    return true;
  }
  return false;
}

function onDragover(event: DragEvent): boolean {
  const node = getImageNodeInSelection();
  if (!node) {
    return false;
  }
  if (!canDropImage(event)) {
    event.preventDefault();
  }
  return true;
}

function onDrop(event: DragEvent, editor: LexicalEditor): boolean {
  const node = getImageNodeInSelection();
  if (!node) {
    return false;
  }
  const data = getDragImageData(event);
  if (!data) {
    return false;
  }
  event.preventDefault();
  if (canDropImage(event)) {
    const range = getDragSelection(event);
    node.remove();
    const rangeSelection = $createRangeSelection();
    if (range !== null && range !== undefined) {
      rangeSelection.applyDOMRange(range);
    }
    $setSelection(rangeSelection);
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, data);
  }
  return true;
}

function getImageNodeInSelection(): ImageNode | null {
  const selection = $getSelection();
  if (!$isNodeSelection(selection)) {
    return null;
  }
  const nodes = selection.getNodes();
  const node = nodes[0];
  return $isImageNode(node) ? node : null;
}

function getDragImageData(event: DragEvent): null | InsertImagePayload {
  const dragData = event.dataTransfer?.getData("application/x-lexical-drag");
  if (!dragData) {
    return null;
  }
  const { type, data } = JSON.parse(dragData);
  if (type !== "image") {
    return null;
  }

  return data;
}

declare global {
  interface DragEvent {
    rangeOffset?: number;
    rangeParent?: Node;
  }
}

function canDropImage(event: DragEvent): boolean {
  const target = event.target;
  return !!(
    target &&
    target instanceof HTMLElement &&
    !target.closest("code, span.editor-image") &&
    target.parentElement &&
    target.parentElement.closest("div.ContentEditable__root")
  );
}

function getDragSelection(event: DragEvent): Range | null | undefined {
  let range;
  if (window) {
    const domSelection = window.getSelection();
    if (window.document.caretRangeFromPoint) {
      range = window.document.caretRangeFromPoint(event.clientX, event.clientY);
    } else if (event.rangeParent && domSelection !== null) {
      domSelection.collapse(event.rangeParent, event.rangeOffset || 0);
      range = domSelection.getRangeAt(0);
    } else {
      throw Error(`Cannot get the selection when dragging`);
    }
  }

  return range;
}
