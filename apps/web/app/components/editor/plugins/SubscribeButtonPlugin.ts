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
import type { SubscribeButtonPayload } from "../nodes/SubscribeButtonNode";
import {
  $createSubscribeButtonNode,
  SubscribeButtonNode,
} from "../nodes/SubscribeButtonNode";

export type InsertSubscribeButtonPayload = Readonly<SubscribeButtonPayload>;

export const INSERT_SUBSCRIBE_BUTTON_COMMAND: LexicalCommand<SubscribeButtonPayload> =
  createCommand("INSERT_SUBSCRIBE_BUTTON_COMMAND");

export default function SubscribeButtonPlugin(): JSX.Element | null {
  const rootData = useRouteLoaderData("root") as RootData;
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([SubscribeButtonNode])) {
      throw new Error(
        "SubscribeButtonPlugin: SubscribeButtonNode is not registered on editor"
      );
    }

    return editor.registerCommand<SubscribeButtonPayload>(
      INSERT_SUBSCRIBE_BUTTON_COMMAND,
      (payload) => {
        const node = $createSubscribeButtonNode(payload);
        if (payload.showCaption) {
          const paragraphNode = $createParagraphNode();
          paragraphNode
            .append(
              $createTextNode(`Thanks for reading ${rootData?.store?.name}! \n`)
            )
            .setFormat("center")
            .append(
              $createTextNode(
                `Subscribe for free to receive new posts and support my work.`
              )
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
