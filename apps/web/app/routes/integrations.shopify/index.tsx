import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useNavigation,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import {
  Box,
  Button,
  Callout,
  CompositeZIndex,
  Dropdown,
  FixedZIndex,
  Flex,
  Icon,
  Image,
  Layer,
  Link as GLink,
  Modal,
  PageHeader,
  SlimBanner,
  Spinner,
  Text,
} from "gestalt";
import { useCallback, useState } from "react";
import { sdk } from "~/graphql/graphqlWrapper.server";
import type { RootData } from "~/root";
import { getSubdomain, isPrivateRoute } from "~/utils/utils.server";
import {
  BillingPlanStatus,
  BillingSubscriptionEntity,
} from "../../graphql/__generated__/graphql";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import CustomerSync from "./CustomerSync";
import ProductSync from "./ProductScync";
import type { IntegrationShopifyData } from "./types";
import { IntegrationShopifyActionEnum } from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Shopify - Integrations | ${rootData.store?.name}`,
    description: "Connect your shopify ecommerce site.",
  };
};

export async function loader({ request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  const subdomain = getSubdomain(request);
  if (!subdomain) return redirect("/");

  const response = await Promise.all([
    sdk.GetIntegrationWithSubdomain(
      { subdomain },
      { request, forbiddenRedirect: "/" }
    ),
    sdk.GetLists(
      {
        subdomain,
      },
      { request }
    ),
    sdk.GetStoreBilling(
      {
        subdomain,
      },
      { request }
    ),
  ]);

  const integration = response[0];
  const lists = response[1];
  const billing = response[2];

  return json<IntegrationShopifyData>({
    integration: integration.getIntegrationWithSubdomain,
    lists: lists.getLists,
    billing: billing.getStoreBilling,
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const action = formData.get("_action");

  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  const subdomain = getSubdomain(request);
  if (!subdomain) return redirect("/");

  if (action === IntegrationShopifyActionEnum.syncShopifyProducts) {
    const shopifyId = formData.get("shopifyId") as string;
    await sdk.SyncShopifyProducts(
      {
        shopifyId,
      },
      { request, forbiddenRedirect: "/" }
    );
  }
  if (action === IntegrationShopifyActionEnum.syncShopifyCustomers) {
    const shopifyId = formData.get("shopifyId") as string;
    await sdk.SyncShopifyCustomers(
      {
        shopifyId,
      },
      { request, forbiddenRedirect: "/" }
    );
  }

  if (action === IntegrationShopifyActionEnum.stopShopifyProductSync) {
    const shopifyId = formData.get("shopifyId") as string;
    await sdk.StopShopifyProductSync(
      {
        shopifyId,
      },
      { request, forbiddenRedirect: "/" }
    );
  }
  if (action === IntegrationShopifyActionEnum.stopShopifyCustomerSync) {
    const shopifyId = formData.get("shopifyId") as string;
    await sdk.StopShopifyCustomerSync(
      {
        shopifyId,
      },
      { request, forbiddenRedirect: "/" }
    );
  }

  if (action === IntegrationShopifyActionEnum.collectEmailSubscribers) {
    const shopifyId = formData.get("shopifyId") as string;
    const listId = formData.get("listId") as string;
    await sdk.CollectEmailSubscribers(
      {
        listId,
        shopifyId,
      },
      { request }
    );
  }
  if (action === IntegrationShopifyActionEnum.removeCollectEmailSubscribers) {
    const shopifyId = formData.get("shopifyId") as string;
    await sdk.RemoveCollectEmailSubscribers(
      {
        shopifyId,
      },
      { request }
    );
  }
  if (action === IntegrationShopifyActionEnum.shopifyAppSubscriptionCancel) {
    // const shopifyId = formData.get("shopifyId") as string;
    const response = await sdk.ShopifyAppSubscriptionCancle(
      { subdomain },
      { request }
    );
    // await sdk.RemoveShopifyIntegration(
    //   {
    //     shopifyId,
    //   },
    //   { request, forbiddenRedirect: "/" }
    // );

    if (response.shopifyAppSubscriptionCancel) {
      return redirect("/growth-path/cancelled");
    }
  }

  return null;
}

export default function ShopifyIntegration() {
  const loaderData = useLoaderData<IntegrationShopifyData>();

  const manageBilling =
    loaderData?.billing?.billingPlanStatus === BillingPlanStatus.Active ||
    loaderData?.billing?.billingPlanStatus === BillingPlanStatus.PastDue ||
    loaderData?.billing?.billingPlanStatus === BillingPlanStatus.Pending;

  const [cancelSubModal, setCancelSubModal] = useState(false);

  const [searchParams] = useSearchParams();

  const inavlidBillingEntity =
    searchParams.get("error") === "invalidBillingEntity" ? true : false;

  const connectDisabled =
    (loaderData.billing?.billingPlanStatus === BillingPlanStatus.Active ||
      loaderData.billing?.billingPlanStatus === BillingPlanStatus.PastDue ||
      loaderData.billing?.billingPlanStatus === BillingPlanStatus.Pending) &&
    loaderData.billing.billingSubscriptionEntity ===
      BillingSubscriptionEntity.Stripe;

  return (
    <>
      <Box paddingX={2}>
        <Flex justifyContent="start" alignItems="center" gap={2}>
          <Link to="..">
            <Text underline size="100">
              Integrations
            </Text>
          </Link>

          <Icon
            accessibilityLabel="arrow-right"
            size={10}
            icon="arrow-forward"
            color="dark"
          />
          <Box color="lightWash" rounding="pill" padding={1} paddingX={2}>
            <Text size="100">Shopify</Text>
          </Box>
        </Flex>
      </Box>

      <PageHeader
        borderStyle="none"
        title="SHOPIFY"
        badge={{ text: "New", tooltipText: "New" }}
        thumbnail={
          <Image
            color="transparent"
            alt="shopify logo"
            naturalHeight={400}
            naturalWidth={400}
            src="https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1659631710/shopify_pqza7e.svg"
          />
        }
        primaryAction={
          loaderData?.billing?.billingSubscriptionEntity ===
            BillingSubscriptionEntity.Shopify && manageBilling
            ? {
                component: (
                  <Button
                    size="lg"
                    text="Cancel Subscription"
                    role="button"
                    type="button"
                    color="white"
                    onClick={() => setCancelSubModal(true)}
                  />
                ),
                dropdownItems: [
                  <Dropdown.Item
                    key="add-prodcut"
                    option={{ label: "Cancel Subscription", value: "cancle" }}
                    onSelect={() => setCancelSubModal(true)}
                  />,
                ],
              }
            : undefined
        }
      />

      <Flex justifyContent="center">
        <Box paddingY={6} width="90%">
          <Flex direction="column" gap={12}>
            {connectDisabled || inavlidBillingEntity ? (
              <Box>
                <Box marginBottom={2}>
                  <Callout
                    iconAccessibilityLabel="Connect is disabled!"
                    message="Looks like you are already under a subscription plan. Please cancel your current subscription plan to connect with your Shopify store. You can choose a plan after you have connected with your store."
                    type="error"
                    title="Connect is disabled!"
                    primaryAction={{
                      accessibilityLabel: "",
                      label: "Plans",
                      href: "/plans",
                    }}
                  />
                </Box>
                <SlimBanner
                  message="Subscriptions are handled by Shopify for insalled apps."
                  type="info"
                  iconAccessibilityLabel="info"
                />
              </Box>
            ) : null}
            {loaderData.integration?.shopify?.authenticated &&
            loaderData.integration.shopify.sessionExpired &&
            inavlidBillingEntity === false ? (
              <Callout
                iconAccessibilityLabel=""
                message="Your shopify session has expired. Please uninstall and reinstall the app to update your shopify session."
                type="error"
                title="Session Expired"
                // primaryAction={{
                //   label: "Re-authorize",
                //   accessibilityLabel: "re-authorize",
                //   href: SHOPIFY_LINK,
                // }}
              />
            ) : null}
            {/* <Subscriptions /> */}
            <Flex direction="column" gap={6}>
              <Flex direction="column" gap={2}>
                <Text weight="bold" size="400">
                  Details
                </Text>
                <Text>
                  After connecting with Shopify, your store will do the
                  following things:
                </Text>
              </Flex>

              <Flex direction="column" gap={2}>
                <Text weight="bold">Signup Forms & Customer Details Sync</Text>
                <Flex direction="column" gap={1}>
                  <Text>
                    All added signup forms will be synched with your Shopify
                    store.
                  </Text>
                  <SlimBanner
                    message="Synched during connect"
                    type="infoBare"
                    iconAccessibilityLabel="info"
                  />
                </Flex>
                <Text>
                  Customer details auto syncs as updates are made from your
                  store.
                </Text>
              </Flex>

              <ProductSync />

              <CustomerSync />
            </Flex>
          </Flex>
        </Box>
      </Flex>

      {cancelSubModal && <CancelSub close={() => setCancelSubModal(false)} />}
    </>
  );
}

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

const CancelSub = ({ close }: { close: () => void }) => {
  const loaderData = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const navigation = useNavigation();

  const loading =
    navigation.state === "loading" || navigation.state === "submitting";

  const handlecancelSubcription = useCallback(() => {
    if (!loaderData.integration?.shopify?.id) return;
    const formData = new FormData();
    formData.append("shopifyId", loaderData.integration?.shopify?.id);
    formData.append(
      "_action",
      IntegrationShopifyActionEnum.shopifyAppSubscriptionCancel
    );
    submit(formData, { method: "post" });
  }, [loaderData.integration?.shopify?.id, submit]);

  return (
    <Layer zIndex={zIndex}>
      <Modal
        heading="Cancel Subscription?"
        onDismiss={close}
        accessibilityModalLabel="cancel subscription"
        align="start"
        footer={
          <>
            {loading ? (
              <Flex
                alignItems="center"
                justifyContent="end"
                gap={{
                  row: 2,
                  column: 0,
                }}
              >
                <Spinner accessibilityLabel="loaidng" show />
              </Flex>
            ) : (
              <Flex
                alignItems="center"
                justifyContent="end"
                gap={{
                  row: 2,
                  column: 0,
                }}
              >
                <Button text="Cancel" onClick={close} />
                <Button
                  color="red"
                  text="Cancel Right Now"
                  onClick={handlecancelSubcription}
                />
              </Flex>
            )}
          </>
        }
      >
        <Box>
          <Text inline>Your subscription will get cancelled </Text>
          <Text inline color="warning">
            right now
          </Text>
          <Text inline>. We recommend cancelling by the end of the </Text>
          <GLink
            href={`https://${loaderData?.integration?.shopify?.storeUrl}/admin/settings/billing/subscriptions`}
            target="blank"
            display="inlineBlock"
          >
            <Text underline>billing period.</Text>
          </GLink>
        </Box>
      </Modal>
    </Layer>
  );
};
