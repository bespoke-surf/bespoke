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
import { useFetcher, useRouteLoaderData } from "@remix-run/react";
import { useFormik } from "formik";
import { Box, Button, Icon, TextField } from "gestalt";
import type { ReactNode } from "react";
import { useCallback } from "react";
import type { RootData } from "../../../root";
import {
  SubscribeActionEnum,
  SubscribeSchema,
} from "../../../routes/subscribe/types";

export type SerializedSubscribeButtonNode = Spread<
  {
    type: string;
    version: 1;
  },
  SerializedLexicalNode
>;

export interface SubscribeButtonPayload {
  href: string;
  showCaption: boolean;
}

export type SerializedSubscribeButton = Spread<
  Omit<SubscribeButtonPayload, "showCaption"> & {
    type: string;
    version: 1;
  },
  SerializedLexicalNode
>;

export class SubscribeButtonNode extends DecoratorNode<ReactNode> {
  __href: string;

  static getType(): string {
    return "subscribeButton";
  }

  static clone(node: SubscribeButtonNode): SubscribeButtonNode {
    return new SubscribeButtonNode(node.__href, node.__key);
  }

  constructor(href: string, key?: NodeKey) {
    super(key);
    this.__href = href;
  }

  static importJSON({ href }: SerializedSubscribeButton): SubscribeButtonNode {
    const node = $createSubscribeButtonNode({ href });
    return node;
  }

  createDOM() {
    const element = document.createElement("div");
    return element;
  }

  updateDOM(): false {
    return false;
  }

  exportJSON(): SerializedSubscribeButton {
    return {
      type: this.getType(),
      version: 1,
      href: this.__href,
    };
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("div");
    element.innerHTML = SubscribeButtonElement(this.__href);
    return {
      element,
    };
  }

  decorate(): ReactNode {
    return <SubscribeButtonComponent />;
  }
}
export function $createSubscribeButtonNode({
  href,
}: Omit<SubscribeButtonPayload, "showCaption">): SubscribeButtonNode {
  return new SubscribeButtonNode(href);
}

export function $isSubscribeButtonNode(
  node: SerializedDecoratorBlockNode | LexicalNode | null | undefined
): node is SubscribeButtonNode {
  return node instanceof SubscribeButtonNode;
}

function SubscribeButtonComponent() {
  const rootData = useRouteLoaderData("root") as RootData;
  const fetcher = useFetcher<{ success: boolean } | null | undefined>();
  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  const handleSubmit = useCallback(
    (values: { email: string }) => {
      if (!rootData?.store?.id) return;
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("storeId", rootData.store.id);
      formData.append("_action", SubscribeActionEnum.subscribe);
      fetcher.submit(formData, { method: "post", action: "/subscribe?index" });
    },
    [fetcher, rootData?.store?.id]
  );

  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: handleSubmit,
    validationSchema: SubscribeSchema.omit(["storeId", "_action"]),
  });

  return (
    <Box
      display="flex"
      marginTop={6}
      alignItems="center"
      wrap
      justifyContent="center"
    >
      <Box margin={1}>
        <TextField
          size="lg"
          id="email"
          name="email"
          onChange={({ event }) => formik.handleChange(event)}
          onBlur={({ event }) => formik.handleBlur(event)}
          placeholder="Email"
          errorMessage={
            formik.errors.email && formik.touched.email
              ? formik.errors.email
              : undefined
          }
          disabled={loading}
          value={formik.values.email}
        />
      </Box>
      <Box margin={1}>
        {fetcher.data?.success ? (
          <Icon accessibilityLabel="chec" icon="check-circle" color="success" />
        ) : (
          <Button
            color="red"
            text="Subscribe"
            size="lg"
            fullWidth
            disabled={loading}
            onClick={() => formik.handleSubmit()}
          />
        )}
      </Box>
    </Box>
  );
}

const SubscribeButtonElement = (href: string) => `
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
                              "Segoe UI Emoji", "Segoe UI Symbol";font-size:16px;font-weight:600;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding-top:15px;padding-bottom:15px;padding-left:12px;padding-right:12px;mso-padding-alt:0px;border-radius:24px;' target="_blank"> Subscribe </a>
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
    </div>`;
