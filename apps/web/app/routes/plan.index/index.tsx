import {
  FREE_PLAN_ID,
  bespokePricingPlan,
} from "@bespoke/common/dist/pricingPlan";
import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useFetcher, useNavigate, useRouteLoaderData } from "@remix-run/react";
import {
  Box,
  Button,
  Dropdown,
  Flex,
  PageHeader,
  SlimBanner,
  Text,
} from "gestalt";
import { useCallback, useMemo } from "react";
import {
  BillingPlanStatus,
  BillingSubscriptionEntity,
} from "../../graphql/__generated__/graphql";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import type { GrowthPathData } from "../plan/types";
import { numberWithCommas } from "../pricing/pricingUtil";
import CalloutErrors from "./CalloutErrors";
import ContactUsage from "./ContactUsage";
import EmailUsage from "./EmailUsage";
import type { GrowthPathChooseData } from "./types";
import { PlanIndexActionEnum } from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Plan | ${rootData.store?.name}`,
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
    sdk.GetSubscriberCountAddedToday(
      {
        subdomain,
      },
      { request }
    ),
    sdk.GetEmailSentTodayCount(
      {
        subdomain,
      },
      { request }
    ),
    sdk.GetEmailSentThisMonthCount(
      {
        subdomain,
      },
      { request }
    ),
  ]);

  const subscriberCount = response[0].getSubscriberCountAddedToday;
  const emailCount = response[1].getEmailSentTodayCount;
  const emailSentThisMonthCount = response[2].getEmailSentThisMonthCount;

  return json<GrowthPathChooseData>(
    {
      emailSentTodayCount: emailCount,
      subscriberAddedTodayCount: subscriberCount,
      emailSentThisMonthCount,
    },
    {
      headers: {
        "cache-control": "private, max-age=5",
      },
    }
  );
}
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const subdomain = getSubdomain(request);
  if (!subdomain) return redirect("/");

  const action = formData.get("_action");

  if (action === PlanIndexActionEnum.getCustomerPortalSession) {
    const respnoe = await sdk.GetCustomerPortalSession(
      {
        subdomain,
      },
      {
        request,
      }
    );
    console.log({ respnoe }, "hello");
    if (respnoe.getCustomerPortalSession) {
      return redirect(respnoe.getCustomerPortalSession);
    }
  }

  if (action === PlanIndexActionEnum.createShopifyAppSubscription) {
    const contactQuantity = formData.get("contactQuantity");
    const isPremium = formData.get("isPremium") as string;
    const response = await sdk.CreateShopifyAppSubscription(
      {
        input: {
          contactQuantity: Number(contactQuantity),
          subdomain,
          isPremium: isPremium === "true" ? true : false,
        },
      },
      { request }
    );
    if (response.createShopifyAppSubscription) {
      return redirect(response.createShopifyAppSubscription);
    }
  }

  return null;
}

export default function ChoosePlan() {
  const parentData = useRouteLoaderData("routes/plan/index") as GrowthPathData;
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const free = parentData.billing?.billingPlanStatus === BillingPlanStatus.Free;

  // const planData = useMemo(
  //   () =>
  //     bespokePricingPlan.find(
  //       ({ id }) => id === parentData.billing?.bespokePlanId
  //     ),
  //   [parentData.billing?.bespokePlanId]
  // );

  const handleMangeBilling = useCallback(() => {
    if (
      parentData?.billing?.billingSubscriptionEntity ===
      BillingSubscriptionEntity.Shopify
    ) {
      navigate(
        `https://${parentData.integration?.shopify?.storeUrl}/admin/settings/billing/subscriptions`
      );
    } else {
      const formData = new FormData();
      formData.append("_action", PlanIndexActionEnum.getCustomerPortalSession);
      fetcher.submit(formData, { method: "post" });
    }
  }, [
    fetcher,
    navigate,
    parentData?.billing?.billingSubscriptionEntity,
    parentData.integration?.shopify?.storeUrl,
  ]);

  return (
    <>
      <PageHeader
        borderStyle="none"
        title="PLAN"
        subtext="Subscription plan to supercharge your business for growth"
        primaryAction={{
          component: (
            <Button
              color={free ? "red" : "gray"}
              size="lg"
              text="Change Plan"
              type="button"
              role="link"
              href="/plan/choose"
            />
          ),
          dropdownItems: [
            <Dropdown.Link
              href="/plan/choose"
              key="choose-plan"
              option={{ label: "Change Plan", value: "add" }}
            />,
          ],
        }}
        secondaryAction={
          free
            ? undefined
            : {
                component: (
                  <Button
                    color="red"
                    size="lg"
                    text="Manage Billing"
                    type="button"
                    role="button"
                    onClick={handleMangeBilling}
                  />
                ),
                dropdownItems: [
                  <Dropdown.Item
                    onSelect={handleMangeBilling}
                    key="handle-billing"
                    option={{
                      label: "Manage Billing",
                      value: "manage-billing",
                    }}
                  />,
                ],
              }
        }
      />
      <Flex justifyContent="center">
        <Box width="92.5%" paddingY={6}>
          <CalloutErrors />
          <PlanDetails />
          <Box marginTop={12} />
          <Text weight="bold" size="400">
            Usage
          </Text>
          <Box marginTop={4} />
          <ContactUsage />
          <Box marginTop={6} />
          <EmailUsage />
        </Box>
      </Flex>
    </>
  );
}

const PlanDetails = () => {
  const parentData = useRouteLoaderData("routes/plan/index") as GrowthPathData;

  const cancelled =
    parentData.billing?.billingPlanStatus === BillingPlanStatus.Cancelled;

  const planData = useMemo(
    () =>
      bespokePricingPlan.find(
        ({ id }) => id === parentData.billing?.bespokePlanId
      ),
    [parentData.billing?.bespokePlanId]
  );

  return (
    <>
      <Flex justifyContent="between" alignItems="center">
        <Flex gap={3} direction="column">
          <Box>
            <Text weight="bold" inline>
              {" "}
              {planData?.title}
            </Text>{" "}
          </Box>
          {cancelled && (
            <SlimBanner
              message="This plan is currenlty cancelled"
              type="errorBare"
              iconAccessibilityLabel="cancelled"
            />
          )}

          <Text size="300" color="dark">
            {numberWithCommas(planData?.contacts ?? 0)} contacts and{" "}
            {numberWithCommas(planData?.emails ?? 0)} marketing emails/mo
          </Text>
          {planData?.id !== FREE_PLAN_ID && (
            <Text size="300" color="dark">
              ${planData?.overages} per additional contact or email
            </Text>
          )}
        </Flex>
        <Text inline size="300" weight="bold" color="dark">
          ${planData?.price}.00
        </Text>
      </Flex>
    </>
  );
};
