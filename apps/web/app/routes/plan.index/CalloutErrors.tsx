import { useFetcher, useNavigate, useRouteLoaderData } from "@remix-run/react";
import { Box, Callout, Flex } from "gestalt";
import { useCallback } from "react";
import {
  BillingPlanStatus,
  BillingSubscriptionEntity,
  ContactLimitStatus,
  EmailSentLimitStatus,
} from "../../graphql/__generated__/graphql";
import type { RootData } from "../../root";
import { calculateLocalTime } from "../../utils/calculateLocalTime";
import type { GrowthPathData } from "../plan/types";
import { PlanIndexActionEnum } from "./types";

export default function CalloutErrors() {
  const rootData = useRouteLoaderData("root") as RootData;
  const parentData = useRouteLoaderData("routes/plan/index") as GrowthPathData;
  const navigate = useNavigate();
  const fetcher = useFetcher();

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

  const freenExceeded =
    (parentData.billing?.billingPlanStatus === BillingPlanStatus.Free &&
      rootData?.store?.contactLimitStatus === ContactLimitStatus.Disallowed) ||
    (parentData.billing?.billingPlanStatus === BillingPlanStatus.Free &&
      rootData?.store?.emailSentLimitStatus ===
        EmailSentLimitStatus.Disallowed);
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
          message="Your plan has been cancelled. Upgrade your plan today to start growing."
          title="Plan Stopped!"
          iconAccessibilityLabel="error"
          primaryAction={{
            accessibilityLabel: "plan choose",
            label: "Choose Plan",
            href: "/plan/choose",
          }}
        />
      )}
      {parentData?.billing?.billingPlanStatus === BillingPlanStatus.PastDue && (
        <Callout
          type="error"
          message="Your current payment is past due."
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
              onClick: handleMangeBilling,
            }}
            iconAccessibilityLabel="error"
          />
        )}
      {freenExceeded && (
        <Callout
          type="error"
          message="It's time to upgrade your free plan. You have reached the limit of your free plan. Choose a plan to upgrade."
          title="Free plan limit reached!"
          primaryAction={{
            accessibilityLabel: "choose",
            label: "Choose Plan",
            href: "/plan/choose",
          }}
          iconAccessibilityLabel="error"
        />
      )}

      {/* {rootData?.store?.contactLimitStatus ===
        ContactLimitStatus.BrinkOfDissalwoed ||
      rootData.store?.emailSentLimitStatus ===
        EmailSentLimitStatus.BrinkOfDissalwoed ? (
        <Callout
          iconAccessibilityLabel="error"
          message="Update your plan to the next tier through the manage billing portal."
          type="recommendation"
          primaryAction={{
            label: "Manage billing",
            accessibilityLabel: "plans",
            onClick: handleMangeBilling,
          }}
          title="Overage pricing is starting soon!"
        />
      ) : null}
      {rootData?.store?.contactLimitStatus === ContactLimitStatus.Disallowed ||
      rootData.store?.emailSentLimitStatus ===
        EmailSentLimitStatus.Disallowed ? (
        <Callout
          iconAccessibilityLabel="error"
          message="Benefits fo current Growth Path has exceeded. Unlock new Growth Path to enjoy your benefits."
          type="error"
          primaryAction={{
            label: "Manage Billing",
            accessibilityLabel: "manage billing",
            onClick: handleMangeBilling,
          }}
          title="Benefits Exceeded!"
        />
      ) : null} */}
      {pending || cancelled || pastDue || rewNew || exceedeBenefits ? (
        <Box marginBottom={8} />
      ) : (
        <Box />
      )}
    </Flex>
  );
}
