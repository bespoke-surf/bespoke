import { bespokePricingPlan } from "@bespoke/common/dist/pricingPlan";
import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { Box, Callout } from "gestalt";
import { useMemo } from "react";
import { EmailSentLimitStatus } from "../../graphql/__generated__/graphql";
import type { RootData } from "../../root";
import type { AutomationData } from "./types";

export default function CalloutErrors() {
  const rootData = useRouteLoaderData("root") as RootData;
  const loaderData = useLoaderData<AutomationData>();

  const planType = useMemo(
    () =>
      bespokePricingPlan.find(
        ({ id }) => id === loaderData.billing?.bespokePlanId
      )?.type,
    [loaderData.billing?.bespokePlanId]
  );

  const tableEmpty =
    loaderData.workflows?.length === 0 ||
    loaderData.workflows === null ||
    loaderData.workflows === undefined;

  const basicPlan = planType === "basic";
  const emailDisalowe =
    rootData?.store?.emailSentLimitStatus === EmailSentLimitStatus.Disallowed;

  return (
    <>
      {basicPlan && (
        <Box marginBottom={4}>
          <Callout
            iconAccessibilityLabel="warning"
            title="Workflow are disabled!"
            key="add subs"
            type="error"
            message="Workflows are disabled for Basic Plan type. Please upgarde to the Advanced Plan type to enable workflows."
            primaryAction={{
              label: "Plan",
              accessibilityLabel: "Plan",
              href: "/Plan",
            }}
          />
        </Box>
      )}
      {emailDisalowe && (
        <Box marginBottom={8}>
          <Callout
            iconAccessibilityLabel="warning"
            title="Insufficient email sends."
            key="add subs"
            type="error"
            message="You have reached sending emails limit. Please upgrade your plan."
            primaryAction={{
              label: "Plan",
              accessibilityLabel: "Plan",
              href: "/Plan",
            }}
          />
        </Box>
      )}

      {tableEmpty ? (
        <Callout
          iconAccessibilityLabel="warning"
          title="Start Automating Today"
          key="automation"
          type="info"
          message="Create a new automation and start sending messages to your customers on autopilot."
          // primaryAction={{
          //   label: "Community",
          //   accessibilityLabel: "Community",
          //   href: "/community",
          // }}
        />
      ) : null}
      {basicPlan || tableEmpty || emailDisalowe ? (
        <Box marginBottom={8} />
      ) : null}
    </>
  );
}
