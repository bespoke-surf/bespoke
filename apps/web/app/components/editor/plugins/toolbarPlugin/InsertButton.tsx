import { Box, Button, Dropdown } from "gestalt";

import { $createCodeNode } from "@lexical/code";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import { $setBlocksType } from "@lexical/selection";
import { useRouteLoaderData } from "@remix-run/react";
import type { LexicalEditor } from "lexical";
import {
  $getSelection,
  $isRangeSelection,
  DEPRECATED_$isGridSelection,
} from "lexical";
import { useRef, useState } from "react";
import { NewPostLayerZIndex } from "~/routes/index/reader/zIndex";
import { MetricType } from "../../../../graphql/__generated__/graphql";
import type { RootData } from "../../../../root";
import type { AutomationWorkflowData } from "../../../../routes/automations.$workflowId/types";
import type { ShareButtonPayload } from "../../nodes/ShareButton";
import type { SubscribeButtonPayload } from "../../nodes/SubscribeButtonNode";
import { INSERT_SHARE_BUTTON_COMMAND } from "../ShareButtonPlugin";
import { INSERT_SUBSCRIBE_BUTTON_COMMAND } from "../SubscribeButtonPlugin";
import type { blockTypeToBlockName } from "../ToolbarPlugin";
import AbandonedCartModal from "./InsertButton/AbandonedCartModal";
import AbandonedCartProducts from "./InsertButton/AbandonedCartProducts";
import ProductModal from "./InsertButton/ProductModal";

export default function InsertButton({
  blockType,
  editor,
  activeEditor,
  disableButtons = false,
  disableProduct = false,
  disableShare = false,
}: {
  blockType: keyof typeof blockTypeToBlockName;
  editor: LexicalEditor;
  activeEditor: LexicalEditor;
  disableButtons?: boolean;
  disableProduct?: boolean;
  disableShare?: boolean;
}) {
  const automationData = useRouteLoaderData(
    "routes/automations.$workflowId/index"
  ) as AutomationWorkflowData;
  const rootData = useRouteLoaderData("root") as RootData;
  const [openInsert, setOpenInsert] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openAbandonedCart, setOpenAbandonedCart] = useState(false);
  const [cartProducts, setCartProducts] = useState(false);
  const anchorRefInsert = useRef(null);
  const d =
    automationData?.workflow?.node?.length !== undefined
      ? automationData?.workflow?.node[automationData.workflow.node?.length - 1]
          ?.data
      : undefined;
  const abandonedCart =
    d?.value.__typename === "WorkflowStateMetricTriggerActivityValue" &&
    d?.value.metricType === MetricType.ShopifyCheckoutStarted;

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        let selection = $getSelection();

        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection = $getSelection();
            if ($isRangeSelection(selection))
              selection.insertRawText(textContent);
          }
        }
      });
    }
  };

  return (
    <Box>
      <Button
        accessibilityControls="insert"
        accessibilityExpanded={openInsert}
        accessibilityHaspopup
        iconEnd="arrow-down"
        onClick={() => setOpenInsert((prevVal) => !prevVal)}
        ref={anchorRefInsert}
        selected={openInsert}
        size="lg"
        color="white"
        text="Insert"
      />
      {openInsert && (
        <Dropdown
          zIndex={NewPostLayerZIndex}
          anchor={anchorRefInsert.current}
          id="tool-bar item"
          onDismiss={() => setOpenInsert(false)}
        >
          <Dropdown.Item
            onSelect={() => {
              activeEditor.dispatchCommand(
                INSERT_HORIZONTAL_RULE_COMMAND,
                undefined
              );
              setOpenInsert(false);
            }}
            option={{ label: "Divider", value: "horzontalRule" }}
          />
          <Dropdown.Item
            onSelect={() => {
              formatCode();
              setOpenInsert(false);
            }}
            option={{ label: "Code block", value: "codeBlock" }}
          />
          {disableProduct ? (
            <></>
          ) : (
            <Dropdown.Section label="Product">
              {abandonedCart ? (
                <Dropdown.Item
                  onSelect={() => {
                    setOpenInsert(false);
                    setCartProducts(true);
                  }}
                  option={{
                    label: "Abandoned Cart",
                    value: "abandoned-cart-products",
                    subtext: "Dynamically insert product(s)",
                  }}
                />
              ) : (
                <></>
              )}

              <Dropdown.Item
                onSelect={() => {
                  setOpenProduct(true);
                  setOpenInsert(false);
                }}
                option={{
                  label: "Product(s)",
                  value: "product",
                  subtext: "insert upto 3 products in a row",
                }}
              />
            </Dropdown.Section>
          )}
          {disableButtons ? (
            <></>
          ) : (
            <Dropdown.Section label="Buttons">
              {abandonedCart ? (
                <Dropdown.Item
                  onSelect={() => {
                    setOpenInsert(false);
                    setOpenAbandonedCart(true);
                  }}
                  option={{
                    label: "Abandoned Cart",
                    value: "abandoned-cart-button",
                  }}
                />
              ) : (
                <></>
              )}

              <Dropdown.Item
                onSelect={() => {
                  const payload: SubscribeButtonPayload = {
                    showCaption: false,
                    href: `${window.location.origin}/subscribe`,
                  };
                  activeEditor.dispatchCommand<any>(
                    INSERT_SUBSCRIBE_BUTTON_COMMAND,
                    payload
                  );
                  setOpenInsert(false);
                }}
                option={{
                  label: "Subscribe",
                  value: "subscribe",
                }}
              />

              <Dropdown.Item
                onSelect={() => {
                  const payload: SubscribeButtonPayload = {
                    showCaption: true,
                    href: `${window.location.protocol}//${rootData?.store?.subdomain}/subscribe`,
                  };
                  activeEditor.dispatchCommand<any>(
                    INSERT_SUBSCRIBE_BUTTON_COMMAND,
                    payload
                  );
                  setOpenInsert(false);
                }}
                option={{
                  label: "Subscribe with caption",
                  value: "subscribeWithCaption",
                }}
              />

              {disableShare ? (
                <></>
              ) : (
                <Dropdown.Item
                  onSelect={() => {
                    const payload: ShareButtonPayload = {
                      showCaption: false,
                      href: `${window.location.origin}${window.location.pathname}/share`,
                    };
                    activeEditor.dispatchCommand<any>(
                      INSERT_SHARE_BUTTON_COMMAND,
                      payload
                    );
                    setOpenInsert(false);
                  }}
                  option={{
                    label: "Share",
                    value: "share",
                  }}
                />
              )}
              {disableShare ? (
                <></>
              ) : (
                <Dropdown.Item
                  onSelect={() => {
                    const payload: ShareButtonPayload = {
                      showCaption: true,
                      href: `${window.location.origin}${window.location.pathname}/share`,
                    };
                    activeEditor.dispatchCommand<any>(
                      INSERT_SHARE_BUTTON_COMMAND,
                      payload
                    );
                    setOpenInsert(false);
                  }}
                  option={{
                    label: "Share with caption",
                    value: "shareWithCaption",
                  }}
                />
              )}
            </Dropdown.Section>
          )}
        </Dropdown>
      )}
      {openProduct && <ProductModal close={() => setOpenProduct(false)} />}
      {openAbandonedCart && (
        <AbandonedCartModal close={() => setOpenAbandonedCart(false)} />
      )}
      {cartProducts && (
        <AbandonedCartProducts close={() => setCartProducts(false)} />
      )}
    </Box>
  );
}
