/* eslint-disable gestalt/prefer-box-no-disallowed */
import type {
  DOMExportOutput,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";
import { DecoratorNode } from "lexical";

import type { SerializedDecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";
import { useParams } from "@remix-run/react";
import { Box, Button } from "gestalt";
import type { ReactNode } from "react";

export interface ShareButtonPayload {
  href: string;
  showCaption: boolean;
}

interface ShareButtonCompnentProps {
  href: string;
}

export type SerializedShareButton = Spread<
  Omit<ShareButtonPayload, "showCaption"> & {
    type: string;
    version: 1;
  },
  SerializedLexicalNode
>;

export class ShareButtonNode extends DecoratorNode<ReactNode> {
  __href: string;

  static getType(): string {
    return "shareButton";
  }

  static clone(node: ShareButtonNode): ShareButtonNode {
    return new ShareButtonNode(node.__href, node.__key);
  }

  constructor(href: string, key?: NodeKey) {
    super(key);
    this.__href = href;
  }

  static importJSON({ href }: SerializedShareButton): ShareButtonNode {
    const node = $createShareButtonNode({ href });
    return node;
  }

  createDOM() {
    const element = document.createElement("div");
    return element;
  }

  updateDOM(): false {
    return false;
  }

  exportJSON(): SerializedShareButton {
    return {
      type: this.getType(),
      version: 1,
      href: this.__href,
    };
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("div");
    element.innerHTML = ShareButtonElement(this.__href);
    return {
      element,
    };
  }

  decorate(): ReactNode {
    return <ShareButtonComponent href={this.__href} />;
  }
}

export function $createShareButtonNode({
  href,
}: Omit<ShareButtonPayload, "showCaption">): ShareButtonNode {
  return new ShareButtonNode(href);
}

export function $isShareButtonNode(
  node: SerializedDecoratorBlockNode | LexicalNode | null | undefined
): node is ShareButtonNode {
  return node instanceof ShareButtonNode;
}

function ShareButtonComponent({ href }: ShareButtonCompnentProps) {
  const { postId } = useParams<{ postId: string }>();
  // changes made here should reflect the above element node for html generation
  return (
    <Box
      display="flex"
      marginTop={6}
      alignItems="center"
      justifyContent="center"
    >
      <Box margin={1}>
        <Button
          color="red"
          text="Share"
          size="lg"
          href={href}
          target="self"
          role={postId ? "button" : "link"}
        />
      </Box>
    </Box>
  );
}

const ShareButtonElement = (href: string) => `
<div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                          <tr>
                            <td align="center" bgcolor="#E60023" role="presentation" style="border:none;border-radius:24px;cursor:auto;mso-padding-alt:12px 16px;background:#E60023;" valign="middle">
                              <a href="${href}" style='display:inline-block;background:#E60023;color:#ffffff;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                              Oxygen-Sans, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
                              Helvetica, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ",
                              Meiryo, "ＭＳ Ｐゴシック", Arial, sans-serif, "Apple Color Emoji",
                              "Segoe UI Emoji", "Segoe UI Symbol";font-size:16px;font-weight:600;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding-top:15px;padding-bottom:15px;padding-left:12px;padding-right:12px;mso-padding-alt:0px;border-radius:24px;' target="_blank"> Share </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
`;
