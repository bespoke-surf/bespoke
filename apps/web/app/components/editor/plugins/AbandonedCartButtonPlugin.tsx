/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement } from "@lexical/utils";
import type { LexicalCommand } from "lexical";
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "lexical";
import { useEffect } from "react";
import type { AbandonedCartButtonPayload } from "../nodes/AbandonedCartButton";
import {
  $createAbandonedCartButtonNode,
  AbandonedCartButtonNode,
} from "../nodes/AbandonedCartButton";

export type InsertAbandonedCartButtonPayload =
  Readonly<AbandonedCartButtonPayload>;

export const INSERT_ABANDONED_CART_BUTTON_COMMAND: LexicalCommand<InsertAbandonedCartButtonPayload> =
  createCommand("INSERT_ABANDONED_CART_BUTTON_COMMAND");

export default function AbandonedCartButtonPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([AbandonedCartButtonNode])) {
      throw new Error(
        "AbandonedCartButtonPlugin: Abaondoned cart button is not registered on editor"
      );
    }

    return editor.registerCommand<AbandonedCartButtonPayload>(
      INSERT_ABANDONED_CART_BUTTON_COMMAND,
      (payload) => {
        const node = $createAbandonedCartButtonNode(payload);

        $insertNodes([node]);
        if ($isRootOrShadowRoot(node.getParentOrThrow())) {
          $wrapNodeInElement(node, $createParagraphNode).selectNext();
        }
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
}
