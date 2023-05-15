/* eslint-disable gestalt/prefer-box-no-disallowed */
import type {
  DOMExportOutput,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  COMMAND_PRIORITY_LOW,
  DecoratorNode,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
} from "lexical";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { mergeRegister } from "@lexical/utils";
import getSymbolFromCurrency from "currency-symbol-map";
import { Box, Button, Flex, Image, Mask, Text } from "gestalt";
import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo } from "react";
import { CdnType } from "../../../graphql/__generated__/graphql";
import { getImageSrcAndSrcSet } from "../../../utils/getCloudinarySrcAndSrcSet";

const productSkeleton = [
  {
    imgSrc:
      "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1669751070/Group_4_3_oaccuw.png",
    width: 601,
    height: 451,
    name: "Product 3",
    price: "price",
    handleBarValues: {
      imgSrc: "{{handleBarValues.abandoned_cart_product.product_two.img_src}}",
      name: "{{handleBarValues.abandoned_cart_product.product_two.name}}",
      price: "{{handleBarValues.abandoned_cart_product.product_two.price}}",
      url: "{{handleBarValues.abandoned_cart_product.product_two.url}}",
    },
  },
  {
    imgSrc:
      "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1669751074/Group_3_9_gri9yg.png",
    width: 601,
    height: 451,
    name: "Product 2",
    price: "price",
    handleBarValues: {
      imgSrc: "{{handleBarValues.abandoned_cart_product.product_one.img_src}}",
      name: "{{handleBarValues.abandoned_cart_product.product_one.name}}",
      price: "{{handleBarValues.abandoned_cart_product.product_one.price}}",
      url: "{{handleBarValues.abandoned_cart_product.product_one.url}}",
    },
  },
  {
    imgSrc:
      "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1669751084/Group_2_7_awinri.png",
    width: 601,
    height: 451,
    name: "Product 1",
    price: "price",
    handleBarValues: {
      imgSrc: "{{handleBarValues.abandoned_cart_product.product_zero.img_src}}",
      name: "{{handleBarValues.abandoned_cart_product.product_zero.name}}",
      price: "{{handleBarValues.abandoned_cart_product.product_zero.price}}",
      url: "{{handleBarValues.abandoned_cart_product.product_zero.url}}",
    },
  },
];

export interface AbandonedCartProductType {
  price: string;
  imgSrc: string;
  name: string;
  url: string;
}

export interface AbandonedCartProductPayload {
  rows: number;
  currency: string;
}

export type SerializedAbandonedCartProductNode = Spread<
  AbandonedCartProductPayload & {
    type: string;
    version: 1;
  },
  SerializedLexicalNode
>;

export class AbandonedCartProductNode extends DecoratorNode<ReactNode> {
  __currency: string;
  __rows: number;

  static getType(): string {
    return "abandonedCartProduct";
  }

  static clone(node: AbandonedCartProductNode): AbandonedCartProductNode {
    return new AbandonedCartProductNode(
      node.__currency,
      node.__rows,
      node.__key
    );
  }

  constructor(currency: string, rows: number, key?: NodeKey) {
    super(key);
    this.__currency = currency;
    this.__rows = rows;
  }

  createDOM() {
    const element = document.createElement("div");
    return element;
  }

  static importJSON(
    serializedNode: SerializedAbandonedCartProductNode
  ): AbandonedCartProductNode {
    const { rows, currency } = serializedNode;
    const node = $createAbandonedCartProductNode({
      rows,
      currency,
    });
    return node;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("div");
    element.innerHTML = ProductFlexElement(this.__products, this.__currency);

    return {
      element,
    };
  }
  exportJSON(): SerializedAbandonedCartProductNode {
    return {
      type: this.getType(),
      version: 1,
      rows: this.__rows,
      currency: this.__currency,
    };
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return (
      <ProductCompnent
        nodeKey={this.getKey()}
        rows={this.__rows}
        currency={this.__currency}
      />
    );
  }
}

export function $createAbandonedCartProductNode({
  rows,
  currency,
}: AbandonedCartProductPayload): AbandonedCartProductNode {
  return new AbandonedCartProductNode(currency, rows);
}

export function $isAbandonedCartProductNode(
  node: AbandonedCartProductNode | LexicalNode | null | undefined
): node is AbandonedCartProductNode {
  return node instanceof AbandonedCartProductNode;
}

function ProductCompnent({
  rows,
  currency,
  nodeKey,
}: AbandonedCartProductPayload & { nodeKey: string }) {
  const [editor] = useLexicalComposerContext();

  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);

  const onDelete = useCallback(
    (payload: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        const event: KeyboardEvent = payload;
        event.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isAbandonedCartProductNode(node)) {
          node.remove();
        }
        setSelected(false);
      }
      return false;
    },
    [isSelected, nodeKey, setSelected]
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      )
    );
  }, [clearSelection, editor, isSelected, onDelete, setSelected]);

  const storeCurrency = useMemo(
    () => getSymbolFromCurrency(currency),
    [currency]
  );

  const selectedProducts = useMemo(
    () =>
      productSkeleton.slice(-rows).map((product, index) => (
        <Box
          key={index}
          justifyContent="center"
          display="flex"
          direction="column"
          alignItems="center"
          marginTop={0}
        >
          <Mask wash rounding={5} height={220} width={220}>
            <ImageContent
              imageSrc={product.imgSrc}
              height={product.height}
              width={product.width}
            />
          </Mask>
          <Box marginTop={2} marginBottom={2}>
            <Flex
              direction="column"
              gap={1}
              justifyContent="center"
              alignItems="center"
            >
              <Text lineClamp={2}>{product.name}</Text>
              <Text>
                {storeCurrency}
                {product.price}
              </Text>
              <ViewProduct link={""} />
            </Flex>
          </Box>
        </Box>
      )),
    [rows, storeCurrency]
  );

  return (
    <Flex
      justifyContent="around"
      alignItems="center"
      wrap
      gap={{ column: 2, row: 2 }}
    >
      {selectedProducts}
    </Flex>
  );
}

const ViewProduct = ({ link }: { link: string }) => {
  return (
    <Button
      text="View Product"
      href={link}
      target="blank"
      role="link"
      type="button"
      size="lg"
    />
  );
};

const ImageContent = ({
  imageSrc,
  height,
  width,
}: {
  imageSrc: string;
  height: number;
  width: number;
}) => {
  const srcString = useMemo(
    () => getImageSrcAndSrcSet(imageSrc, false, CdnType.Cloudinary),
    [imageSrc]
  );
  return (
    <Image
      alt="dynamic abandoned cart product"
      role="presentation"
      color="lightGray"
      src={imageSrc}
      srcSet={srcString?.srcSet}
      sizes={srcString?.sizes}
      naturalHeight={height}
      naturalWidth={width}
      fit="cover"
    />
  );
};

const ProductFlexElement = (rows: number, currency: string) => {
  const storeCurrency = getSymbolFromCurrency(currency);

  const selectedProducts = productSkeleton
    .slice(-rows)
    ?.map((product) => ProductElement(storeCurrency, product.handleBarValues));

  return `
    <div style="margin:0px auto;max-width:600px;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
      <tbody>
        <tr>
          <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
          {{#if handleBarValues.abandoned_cart_product.product_zero}}
              ${selectedProducts[2]}
          {{/if}}
          {{#if handleBarValues.abandoned_cart_product.product_one}}
              ${selectedProducts[1]}
          {{/if}}
          {{#if handleBarValues.abandoned_cart_product.product_two}}
              ${selectedProducts[0]}
          {{/if}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>`;
};

const ProductElement = (
  currency: string | undefined,
  product: AbandonedCartProductType
) => {
  return `
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                <div class="mj-column-per-33-333333333333336 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    <tbody>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                            <tbody>
                              <tr>
                                <td style="width:150px;">
                                  <img height="150" src="${product.imgSrc}" style="border:0;border-radius:20px;display:block;outline:none;text-decoration:none;height:150px;width:100%;font-size:13px;" width="150" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:1;text-align:center;color:#000000;">${product.name}</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:1;text-align:center;color:#000000;">${currency}${product.price}</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                            <tr>
                              <td align="center" bgcolor="#efefef" role="presentation" style="border:none;border-radius:20px;cursor:auto;mso-padding-alt:12px 16px;background:#efefef;" valign="middle">
                                <a href="${product.url}" style='display:inline-block;background:#efefef;color:#000000;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                                Oxygen-Sans, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
                                Helvetica, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ",
                                Meiryo, "ＭＳ Ｐゴシック", Arial, sans-serif, "Apple Color Emoji",
                                "Segoe UI Emoji", "Segoe UI Symbol";;font-size:16px;font-weight:600;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:12px 16px;mso-padding-alt:0px;border-radius:20px;'> View product </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->
    `;
};
