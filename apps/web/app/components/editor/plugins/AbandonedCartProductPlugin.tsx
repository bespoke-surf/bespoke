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
import type { AbandonedCartProductPayload } from "../nodes/AbandonedCartProduct";
import {
  $createAbandonedCartProductNode,
  AbandonedCartProductNode,
} from "../nodes/AbandonedCartProduct";

export type InsertAbandonedCartProductPayload =
  Readonly<AbandonedCartProductPayload>;

export const INSERT_ABANDONED_CART_PRODUCT_COMMAND: LexicalCommand<InsertAbandonedCartProductPayload> =
  createCommand("INSERT_ABANDONED_CART_PRODUCT_COMMAND");

export default function AbandonedCartProductPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([AbandonedCartProductNode])) {
      throw new Error(
        "AbandonedCartProductPlugin: AbandonedCartProductNode not registered on editor"
      );
    }

    return editor.registerCommand<InsertAbandonedCartProductPayload>(
      INSERT_ABANDONED_CART_PRODUCT_COMMAND,
      (payload) => {
        const productNode = $createAbandonedCartProductNode(payload);
        $insertNodes([productNode]);
        if ($isRootOrShadowRoot(productNode.getParentOrThrow())) {
          $wrapNodeInElement(productNode, $createParagraphNode).selectNext();
        }
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
}
