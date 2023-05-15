/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodeToNearestRoot, $wrapNodeInElement } from "@lexical/utils";
import { useFetcher, useParams } from "@remix-run/react";
import type { LexicalCommand } from "lexical";
import {
  $createParagraphNode,
  $getNodeByKey,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "lexical";
import { useEffect } from "react";
import { ProductActionEnum } from "../../../routes/products/types";

import type { ProductPayload } from "../nodes/ProductNode";
import { $createProductNode, ProductNode } from "../nodes/ProductNode";

export type InsertProductPayload = Readonly<ProductPayload>;

export const INSERT_PRODUCT_COMMAND: LexicalCommand<ProductPayload> =
  createCommand("INSERT_PRODUCT_COMMAND");

export default function ProductPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const fetcher = useFetcher();
  const params = useParams<{ postId: string }>();

  useEffect(() => {
    if (!editor.hasNodes([ProductNode])) {
      throw new Error("ProductPlugin: ProductNode not registered on editor");
    }

    return editor.registerCommand<InsertProductPayload>(
      INSERT_PRODUCT_COMMAND,
      (payload) => {
        // const selection = $getSelection();

        const productNode = $createProductNode(payload);
        $insertNodeToNearestRoot(productNode);
        if ($isRootOrShadowRoot(productNode.getParentOrThrow())) {
          $wrapNodeInElement(productNode, $createParagraphNode).selectStart();
        }

        // if ($isRangeSelection(selection)) {
        //   const focusNode = selection.focus.getNode();
        //   focusNode.getTopLevelElementOrThrow().insertAfter(productNode);
        // } else if ($isNodeSelection(selection)) {
        //   const nodes = selection.getNodes();
        //   nodes[nodes.length - 1]
        //     .getTopLevelElementOrThrow()
        //     .insertAfter(productNode);
        // } else {
        //   const root = $getRoot();
        //   root.append(productNode);
        // }
        // const paragraphNode = $createParagraphNode();
        // productNode.insertAfter(paragraphNode);
        // paragraphNode.select();

        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerMutationListener(ProductNode, (nodeMutations) => {
      for (const [nodeKey, mutation] of nodeMutations) {
        if (mutation === "created") {
          editor.update(() => {
            if (!params.postId) return;
            const productNode = $getNodeByKey<ProductNode>(nodeKey);

            let productIds: string[] = [];
            productNode?.__products.forEach((product) => {
              productIds.push(product.id);
            });

            const formData = new FormData();
            formData.append("_action", ProductActionEnum.createProductPost);
            formData.append("postId", params.postId);
            formData.append("nodeKey", nodeKey);
            formData.append("productIds", JSON.stringify(productIds));
            fetcher.submit(formData, {
              method: "post",
              action: "/products?index",
            });
          });
        } else if (mutation === "destroyed") {
          editor.update(() => {
            if (!params.postId) return;
            const formData = new FormData();
            formData.append("_action", ProductActionEnum.deleteProductPost);
            formData.append("postId", params.postId);
            formData.append("nodeKey", nodeKey);
            fetcher.submit(formData, {
              method: "post",
              action: "/products?index",
            });
          });
        }
      }
    });
  }, [editor, fetcher, params.postId]);

  return null;
}
