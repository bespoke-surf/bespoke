/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { LexicalNode } from "lexical";

import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HashtagNode } from "@lexical/hashtag";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { MarkNode } from "@lexical/mark";
import { OverflowNode } from "@lexical/overflow";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";

import { AbandonedCartButtonNode } from "./AbandonedCartButton";
import { AbandonedCartProductNode } from "./AbandonedCartProduct";
import { EmojiNode } from "./EmojiNode";
import { ImageNode } from "./ImageNode";
import { ProductNode } from "./ProductNode";
import { ShareButtonNode } from "./ShareButton";
import { SubscribeButtonNode } from "./SubscribeButtonNode";

type Klass<T extends LexicalNode> = {
  new (...args: any[]): T;
} & Omit<LexicalNode, "constructor">;

const PlaygroundNodes: Array<Klass<LexicalNode>> = [
  AbandonedCartButtonNode,
  AbandonedCartProductNode,
  HeadingNode,
  ListNode,
  ListItemNode,
  EmojiNode,
  QuoteNode,
  CodeNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  HashtagNode,
  CodeHighlightNode,
  AutoLinkNode,
  LinkNode,
  OverflowNode,
  ImageNode,
  HorizontalRuleNode,
  ProductNode,
  MarkNode,
  SubscribeButtonNode,
  ShareButtonNode,
];

export default PlaygroundNodes;
