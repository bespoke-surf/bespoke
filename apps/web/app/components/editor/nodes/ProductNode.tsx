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
import { getImageSrcAndSrcSet } from "~/utils/getCloudinarySrcAndSrcSet";
import type {
  ProductFragment,
  ProductImage,
} from "../../../graphql/__generated__/graphql";

export interface ProductPayload {
  products: ProductFragment[];
  currency: string;
}

export type SerializedProductNode = Spread<
  ProductPayload & {
    type: string;
    version: 1;
  },
  SerializedLexicalNode
>;

export class ProductNode extends DecoratorNode<ReactNode> {
  __currency: string;
  __products: ProductFragment[];

  static getType(): string {
    return "product";
  }

  static clone(node: ProductNode): ProductNode {
    return new ProductNode(node.__currency, node.__products, node.__key);
  }

  constructor(currency: string, products: ProductFragment[], key?: NodeKey) {
    super(key);
    this.__currency = currency;
    this.__products = products;
  }

  createDOM() {
    const element = document.createElement("div");
    return element;
  }

  static importJSON(serializedNode: SerializedProductNode): ProductNode {
    const { products, currency } = serializedNode;
    const node = $createProductNode({
      products,
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
  exportJSON(): SerializedProductNode {
    return {
      type: this.getType(),
      version: 1,
      products: this.__products,
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
        products={this.__products}
        currency={this.__currency}
      />
    );
  }
}

export function $createProductNode({
  products,
  currency,
}: ProductPayload): ProductNode {
  return new ProductNode(currency, products);
}

export function $isProductNode(
  node: ProductNode | LexicalNode | null | undefined
): node is ProductNode {
  return node instanceof ProductNode;
}

function ProductCompnent({
  products,
  currency,
  nodeKey,
}: ProductPayload & { nodeKey: string }) {
  const [editor] = useLexicalComposerContext();

  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey);

  const onDelete = useCallback(
    (payload: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        const event: KeyboardEvent = payload;
        event.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isProductNode(node)) {
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
      products.map((product) => (
        <Box
          key={product.id}
          justifyContent="center"
          display="flex"
          direction="column"
          alignItems="center"
          marginTop={0}
        >
          {product?.image?.length !== undefined && (
            <Mask wash rounding={5} height={220} width={220}>
              <ImageContent image={product?.image?.[0]} />
            </Mask>
          )}
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
                {product.price / 100}
                {(product.price / 100) % 1 === 0 ? ".00" : null}
              </Text>
              {product.externalLink && (
                <ViewProduct link={product.externalLink} />
              )}
            </Flex>
          </Box>
        </Box>
      )),
    [products, storeCurrency]
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

const ImageContent = ({ image }: { image: ProductImage | undefined }) => {
  const srcString = useMemo(
    () => getImageSrcAndSrcSet(image?.src, false, image?.cdnType),
    [image]
  );

  if (srcString === null || !image) {
    return null;
  }

  return (
    <Image
      alt="store product"
      role="presentation"
      color="lightGray"
      src={srcString?.src}
      naturalHeight={image.height}
      naturalWidth={image.width}
      srcSet={srcString?.srcSet}
      sizes={srcString?.sizes}
      fit="cover"
    />
  );
};

const ProductFlexElement = (products: ProductFragment[], currency: string) => {
  const storeCurrency = getSymbolFromCurrency(currency);

  const selectedProducts = products?.map((product) =>
    ProductElement(storeCurrency, product)
  );

  return `
  <div style="margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
    <tbody>
      <tr>
        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
            ${selectedProducts[0]}
            ${selectedProducts[1]}
            ${selectedProducts[2]}
            </td>
          </tr>
        </tbody>
      </table>
    </div>`;
};

const ProductElement = (
  currency: string | undefined,
  product: ProductFragment
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
                                <img height="150" src="${
                                  product.image?.[0]?.src
                                }"  style="border:0;border-radius:20px;display:block;outline:none;text-decoration:none;height:150px;width:100%;font-size:13px;" width="150" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:1;text-align:center;color:#000000;">${
                          product.name
                        }</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:1;text-align:center;color:#000000;">${currency}${
    product.price / 100
  }${(product.price / 100) % 1 === 0 ? ".00" : null}</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                          <tr>
                            <td align="center" bgcolor="#efefef" role="presentation" style="border:none;border-radius:20px;cursor:auto;mso-padding-alt:12px 16px;background:#efefef;" valign="middle">
                              <a href="${
                                product.externalLink
                              }" style='display:inline-block;background:#efefef;color:#000000;font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
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
