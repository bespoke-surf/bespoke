import * as yup from "yup";
import type {
  BillingFragment,
  IntegrationFragment,
  ListFragment,
} from "~/graphql/__generated__/graphql";

export interface IntegrationShopifyData {
  integration: IntegrationFragment | null | undefined;
  lists: ListFragment[] | null | undefined;
  billing: BillingFragment | null | undefined;
}

export enum IntegrationShopifyActionEnum {
  removeStoreIntegration = "removeStoreIntegration",
  syncShopifyProducts = "syncShopifyProducts",
  syncShopifyCustomers = "syncShopifyCustomers",
  stopShopifyProductSync = "stopShopifyProductSync",
  stopShopifyCustomerSync = "stopShopifyCustomerSync",
  collectEmailSubscribers = "collectEmailSubscribers",
  removeCollectEmailSubscribers = "removeCollectEmailSubscribers",
  shopifyAppSubscriptionCancel = "shopifyAppSubscriptionCancel",
}

const domainsRegex = ["myshopify\\.com", "myshopify\\.io"];
export const shopUrlRegex = new RegExp(
  `^[a-zA-Z0-9][a-zA-Z0-9-_]*\\.(${domainsRegex.join("|")})[/]*$`
);

// `/^(?!http|https:\/\/)(?!www\.)+[\w-]+\.myshopify\.(com|io)$/`;

export const ConnectShopifyStore = yup.object().shape({
  storeURL: yup
    .string()
    .matches(shopUrlRegex, {
      message: "please add a valid shop url",
      name: "shopURL",
      excludeEmptyString: true,
    })
    .required("please add a storeURL"),
});
