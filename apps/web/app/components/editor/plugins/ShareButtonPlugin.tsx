/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement } from "@lexical/utils";
import { useRouteLoaderData } from "@remix-run/react";
import type { LexicalCommand } from "lexical";
import {
  $createParagraphNode,
  $createTextNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "lexical";
import { useEffect } from "react";
import type { RootData } from "../../../root";
import type { ShareButtonPayload } from "../nodes/ShareButton";
import { $createShareButtonNode, ShareButtonNode } from "../nodes/ShareButton";

export type InsertShareButtonPayload = Readonly<ShareButtonPayload>;

export const INSERT_SHARE_BUTTON_COMMAND: LexicalCommand<ShareButtonPayload> =
  createCommand("INSERT_SHARE_BUTTON_COMMAND");

export default function ShareButtonPlugin(): JSX.Element | null {
  const rootData = useRouteLoaderData("root") as RootData;
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ShareButtonNode])) {
      throw new Error(
        "ShareButtonPlugin: ShareButtonNode is not registered on editor"
      );
    }

    return editor.registerCommand<ShareButtonPayload>(
      INSERT_SHARE_BUTTON_COMMAND,
      (payload) => {
        const node = $createShareButtonNode(payload);

        if (payload.showCaption) {
          const paragraphNode = $createParagraphNode();
          paragraphNode
            .append(
              $createTextNode(`Thanks for reading ${rootData?.store?.name}! \n`)
            )
            .setFormat("center")
            .append(
              $createTextNode("This post is public so feel free to share it.")
            )
            .setFormat("center");
          $insertNodes([paragraphNode]);
        }

        $insertNodes([node]);
        if ($isRootOrShadowRoot(node.getParentOrThrow())) {
          $wrapNodeInElement(node, $createParagraphNode).selectNext();
        }
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor, rootData?.store?.name]);

  return null;
}
