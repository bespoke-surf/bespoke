import { useRouteLoaderData } from "@remix-run/react";
import { Box, Callout, Flex } from "gestalt";
import { useCallback } from "react";
import {
  BillingPlanStatus,
  ContactLimitStatus,
} from "../../graphql/__generated__/graphql";
import type { RootData } from "../../root";
import { calculateLocalTime } from "../../utils/calculateLocalTime";
import type { GrowthPathData } from "../growth-path/types";

export default function CalloutErrors() {
  const rootData = useRouteLoaderData("root") as RootData;
  const parentData = useRouteLoaderData(
    "routes/growth-path/index"
  ) as GrowthPathData;

  const handleMangeBilling = useCallback(() => {
    // if (
    //   parentData?.billing?.billingSubscriptionEntity ===
    //   BillingSubscriptionEntity.Shopify
    // ) {
    //   navigate(
    //     `https://${parentData.integration?.shopify?.storeUrl}/admin/settings/billing/subscriptions`
    //   );
    // } else {
    //   const formData = new FormData();
    //   formData.append(
    //     "_action",
    //     GrowthPathIndexActionEnum.getCustomerPortalSession
    //   );
    //   fetcher.submit(formData, { method: "post" });
    // }
  }, []);

  const pending =
    parentData?.billing?.billingPlanStatus === BillingPlanStatus.Pending;
  const cancelled =
    parentData?.billing?.billingPlanStatus === BillingPlanStatus.Cancelled;
  const pastDue =
    parentData?.billing?.billingPlanStatus === BillingPlanStatus.PastDue;
  const rewNew =
    parentData?.billing?.billingPlanStatus === BillingPlanStatus.Active &&
    parentData.billing.cancelAtPeriodEnd;

  const exceedeBenefits =
    parentData?.billing?.billingPlanStatus !== BillingPlanStatus.Cancelled &&
    parentData?.billing?.billingPlanStatus !== BillingPlanStatus.Pending &&
    rootData?.store?.contactLimitStatus === ContactLimitStatus.Disallowed;

  return (
    <Flex gap={2} direction="column">
      {parentData?.billing?.billingPlanStatus === BillingPlanStatus.Pending && (
        <Callout
          iconAccessibilityLabel="error"
          message="Your payment is pending approval. Please wait for 23 hours for Stripe to verify your payment, or check if you have any failed invoices in the billing portal. If nothing works select a new plan to reactivate."
          type="error"
          title="Pending Approval!"
          primaryAction={{
            accessibilityLabel: "pay invoice",
            label: "Manage Billing",
            onClick: handleMangeBilling,
          }}
          secondaryAction={{
            accessibilityLabel: "plans",
            href: "/plans/choose",
            label: "Select A Plan",
          }}
        />
      )}

      {parentData?.billing?.billingPlanStatus ===
        BillingPlanStatus.Cancelled && (
        <Callout
          type="error"
          message="Your Growth Path benefits is cancelled. Unlock Growth Path to start gaining benefits."
          title="Benefits Stopped!"
          iconAccessibilityLabel="error"
        />
      )}
      {parentData?.billing?.billingPlanStatus === BillingPlanStatus.PastDue && (
        <Callout
          type="error"
          message="Hey here is to notify you that you have a payment past due."
          title="Payment past due!"
          primaryAction={{
            accessibilityLabel: "plans",
            label: "Pay Due",
            onClick: handleMangeBilling,
          }}
          iconAccessibilityLabel="error"
        />
      )}
      {parentData?.billing?.billingPlanStatus === BillingPlanStatus.Active &&
        parentData.billing.cancelAtPeriodEnd && (
          <Callout
            type="error"
            message={`Your plan is set to be cancelled at ${calculateLocalTime(
              parentData.billing.currentPeriodEnd,
              "LL"
            )}`}
            title="Renew Plan!"
            primaryAction={{
              accessibilityLabel: "plans",
              label: "Renew",
              // onClick: handleMangeBilling,
            }}
            iconAccessibilityLabel="error"
          />
        )}
      {rootData?.store?.contactLimitStatus ===
        ContactLimitStatus.BrinkOfDissalwoed && (
        <Callout
          iconAccessibilityLabel="error"
          message="Update your plan quantity through the manage billing portal."
          type="warning"
          primaryAction={{
            label: "Manage billing",
            accessibilityLabel: "plans",
            // onClick: handleMangeBilling,
          }}
          title="Contact Usage Status!"
        />
      )}
      {parentData?.billing?.billingPlanStatus !== BillingPlanStatus.Cancelled &&
        parentData?.billing?.billingPlanStatus !== BillingPlanStatus.Pending &&
        rootData?.store?.contactLimitStatus ===
          ContactLimitStatus.Disallowed && (
          <Callout
            iconAccessibilityLabel="error"
            message="Benefits fo current Growth Path has exceeded. Unlock new Growth Path to enjoy your benefits."
            type="error"
            // primaryAction={{
            // label: "Manage Billing",
            // accessibilityLabel: "manage billing",
            // onClick: handleMangeBilling,
            // }}
            title="Benefits Exceeded!"
          />
        )}
      {pending || cancelled || pastDue || rewNew || exceedeBenefits ? (
        <Box marginBottom={8} />
      ) : (
        <Box />
      )}
    </Flex>
  );
}
