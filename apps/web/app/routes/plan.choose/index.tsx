/* eslint-disable gestalt/no-spread-props */
import {
  FREE_PLAN_ID,
  bespokePricingPlan,
} from "@bespoke/common/dist/pricingPlan";
import {
  Link,
  useActionData,
  useFetcher,
  useRouteLoaderData,
  useSubmit,
} from "@remix-run/react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Module,
  PageHeader,
  Text,
} from "gestalt";
import { numberWithCommas } from "../pricing/pricingUtil";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useCallback, useEffect, useMemo } from "react";
import { namedAction } from "remix-utils";
import { BottomToast } from "../../components/BottomToast";
import type {
  CreateCheckoutSessionUrlMutationVariables,
  ProrateStripeSubscriptionMutationVariables,
} from "../../graphql/__generated__/graphql";
import { BillingPlanStatus } from "../../graphql/__generated__/graphql";
import { sdk } from "../../graphql/graphqlWrapper.server";
import { useTimeoutTrigger } from "../../hooks/useTimeoutTrigger";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import type { GrowthPathData } from "../plan/types";
import type { IActionData } from "./type";
import { PlanChooseActionEnum } from "./type";

export async function loader({ request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }
  return null;
}

export async function action({ request }: ActionArgs) {
  const formData = await request.clone().formData();
  const subdomain = getSubdomain(request);
  if (!subdomain) return redirect("/");

  return namedAction(request, {
    async [PlanChooseActionEnum.createCheckoutSessionUrl]() {
      const stripePriceId = formData.get(
        "stripePriceId"
      ) as CreateCheckoutSessionUrlMutationVariables["stripePriceId"];

      const response = await sdk.CreateCheckoutSessionUrl(
        {
          stripePriceId,
          subdomain,
        },
        { request }
      );
      if (response.createCheckoutSessionUrl) {
        return redirect(response.createCheckoutSessionUrl);
      }
      return json(null);
    },
    async [PlanChooseActionEnum.prorateStripeSubscription]() {
      const newStripePriceId = formData.get(
        "newStripePriceId"
      ) as ProrateStripeSubscriptionMutationVariables["newStripePriceId"];

      const response = await sdk.ProrateStripeSubscription(
        {
          newStripePriceId,
          subdomain,
        },
        { request }
      );
      if (response.prorateStripeSubscription) {
        console.log("response");
        return json<IActionData>({
          notifyProrated: true,
        });
      } else {
        return json(null);
      }
    },
    async [PlanChooseActionEnum.getCustomerPortalSession]() {
      const respnoe = await sdk.GetCustomerPortalSession(
        {
          subdomain,
        },
        {
          request,
        }
      );
      if (respnoe.getCustomerPortalSession) {
        return redirect(respnoe.getCustomerPortalSession);
      }
      return json(null);
    },
    async [PlanChooseActionEnum.updateToFreePlan]() {
      const response = await sdk.UpdateBillingPlanToFree(
        {
          subdomain,
        },
        { request }
      );
      if (response.updateBillingPlanToFree) {
        return json<IActionData>({ notifyProrated: true });
      }
      return json(null);
    },
  });
}

const common = [
  "Design Email",
  "Segmentation (coming soon)",
  "Campaign (coming soon)",
  "A/B Testing & Dashboard Analytics",
  "Free Templates & Forms",
  "Newsletter",
];

const PlanDetails = ({
  data,
  isFree,
}: {
  data: (typeof bespokePricingPlan)[0];
  isFree?: boolean;
}) => {
  const submit = useSubmit();
  const parentData = useRouteLoaderData("routes/plan/index") as GrowthPathData;
  const statusCancelled =
    parentData.billing?.billingPlanStatus === BillingPlanStatus.Cancelled;

  const { setState: setToast, state: toast } = useTimeoutTrigger(5000);

  const statusFree =
    parentData.billing?.billingPlanStatus === BillingPlanStatus.Free;

  const planData = useMemo(
    () => bespokePricingPlan.find(({ id }) => id === data.id),
    [data.id]
  );

  const handleSelect = () => {
    if (isFree && !statusCancelled) {
      setToast(true);
      return;
    }
    const formData = new FormData();
    if (parentData.billing?.billingPlanStatus === BillingPlanStatus.Active) {
      formData.append(
        "_action",
        PlanChooseActionEnum.prorateStripeSubscription
      );
      formData.append("newStripePriceId", data.stripePriceId);
    } else if (
      // if its free plan and in cancelled state
      parentData.billing?.billingPlanStatus === BillingPlanStatus.Cancelled &&
      isFree
    ) {
      formData.append("_action", PlanChooseActionEnum.updateToFreePlan);
    } else {
      formData.append("_action", PlanChooseActionEnum.createCheckoutSessionUrl);
      formData.append("stripePriceId", data.stripePriceId);
    }

    submit(formData, { method: "POST" });
  };

  return (
    <>
      <Module id={data.id} title={data.title}>
        <Flex direction="column" gap={3}>
          <Text size="300" color="dark">
            {numberWithCommas(data.contacts)} contacts +{" "}
            {numberWithCommas(data.emails)} marketing emails/month
          </Text>
          {isFree ? null : (
            <Text size="300" color="dark">
              ${data.overages} per additional contact or email
            </Text>
          )}
          <Box marginTop={2} />
          <Flex justifyContent="between" alignItems="baseline">
            <Text weight="bold">
              ${numberWithCommas(data.price)}
              {isFree ? null : "/month"}
            </Text>
            {planData?.id === parentData.billing?.bespokePlanId ? (
              <CurrentPlan />
            ) : (
              <>
                <Button
                  text={
                    !statusCancelled && !statusFree && !isFree
                      ? "One-Click Update"
                      : "Select"
                  }
                  onClick={handleSelect}
                  type="button"
                />
              </>
            )}
          </Flex>
        </Flex>
      </Module>
      {toast && (
        <BottomToast
          dissmissButton={{ onDismiss: () => undefined }}
          text="Please cancel your subscription to select the free plan"
          type="error"
        />
      )}
    </>
  );
};

export default function Choose() {
  const parentData = useRouteLoaderData("routes/plan/index") as GrowthPathData;
  const statusFree =
    parentData.billing?.billingPlanStatus === BillingPlanStatus.Free;

  const actionData = useActionData<IActionData | null>();
  const { setState: setToast, state: toast } = useTimeoutTrigger(5000);

  const fetcher = useFetcher();

  useEffect(() => {
    if (actionData?.notifyProrated) {
      console.log("heyo");
      setToast(true);
    }
  }, [actionData?.notifyProrated, setToast]);
  // const planData = useMemo(
  //   () =>
  //     bespokePricingPlan.find(
  //       ({ id }) => id === parentData.billing?.bespokePlanId
  //     ),
  //   [parentData.billing?.bespokePlanId]
  // );

  const handleMangeBilling = useCallback(() => {
    const formData = new FormData();
    formData.append("_action", PlanChooseActionEnum.getCustomerPortalSession);
    fetcher.submit(formData, { method: "post" });
  }, [fetcher]);

  return (
    <>
      {toast && (
        <BottomToast
          text="You have successfully changed your plan"
          dissmissButton={{ onDismiss: () => undefined }}
          type="success"
          primaryAction={
            statusFree
              ? undefined
              : {
                  label: "Manage Billing",
                  accessibilityLabel: "manage billing",
                  onClick: handleMangeBilling,
                }
          }
        />
      )}
      <Box paddingX={2}>
        <Flex justifyContent="start" alignItems="center" gap={2}>
          <Link to="..">
            <Text underline size="100">
              Plan
            </Text>
          </Link>

          <Icon
            accessibilityLabel="arrow-right"
            size={10}
            icon="arrow-forward"
            color="dark"
          />
          <Box color="lightWash" rounding="pill" padding={1} paddingX={2}>
            <Text size="100">Change Plan</Text>
          </Box>
        </Flex>
      </Box>
      <PageHeader borderStyle="none" title="CHANGE PLAN" />
      <Flex justifyContent="center">
        <Box width="92.5%" paddingY={6}>
          <Flex direction="row" justifyContent="between">
            <PlanDetails
              data={{
                contacts: 2000,
                emails: 6000,
                id: FREE_PLAN_ID,
                overages: 0,
                price: 0,
                stripePriceId: "",
                title: "Free",
                type: "default",
              }}
              isFree
            />
            <FreePlan />
          </Flex>
          <Box marginTop={8} />
          <Divider />
          <Box marginTop={8} />
          <Flex direction="row" justifyContent="between">
            <Flex direction="column" gap={3}>
              <Heading size="400">Basic</Heading>
              <BasicPlan />
            </Flex>
            <Flex direction="column" gap={3}>
              {bespokePricingPlan
                .filter(({ type }) => type === "basic")
                .map((data) => (
                  <PlanDetails data={data} key={data.title} />
                ))}
            </Flex>
          </Flex>
          <Box marginTop={8} />
          <Divider />
          <Box marginTop={8} />
          <Flex direction="row" justifyContent="between">
            <Flex direction="column" gap={3}>
              <Heading size="400">Advanced</Heading>
              <AdvancedPlan />
            </Flex>
            <Flex direction="column" gap={3}>
              {bespokePricingPlan
                .filter(({ type }) => type === "advanced")
                .map((data) => (
                  <PlanDetails data={data} key={data.title} />
                ))}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

const CurrentPlan = () => {
  return (
    <Flex direction="row" gap={2} alignItems="center">
      <Icon accessibilityLabel="check" icon="check" color="success" size={12} />

      <Text size="300" color="success">
        Your Current Plan
      </Text>
    </Flex>
  );
};

const Details = ({
  type,
  data,
}: {
  type: "success" | "fail";
  data: string;
}) => {
  return (
    <Flex gap={2} alignItems="center" key={data}>
      <Icon
        accessibilityLabel="check"
        icon={type === "success" ? "check" : "cancel"}
        color={type === "success" ? "success" : "default"}
        size={13}
      />
      <Text>{data}</Text>
    </Flex>
  );
};

const FreePlan = () => {
  return (
    <Flex gap={2} direction="column">
      {common.map((data) => (
        <Details data={data} type="success" key={data} />
      ))}
      <Details data="1 Sign-up Form" type="success" />
      <Details data="Automation" type="success" />
      <Details data="No Dedicated IPs" type="fail" />
    </Flex>
  );
};
const BasicPlan = () => {
  return (
    <Flex gap={2} direction="column">
      {common.map((data) => (
        <Details data={data} type="success" key={data} />
      ))}
      <Details data="5 Sign-up Form" type="success" />
      <Details data="Ticket & Chat Support" type="success" />
      <Details data="No Automation" type="fail" />
      <Details data="No Dedicated IPs" type="fail" />
    </Flex>
  );
};

const AdvancedPlan = () => {
  return (
    <Flex gap={2} direction="column">
      {common.map((data) => (
        <Details data={data} type="success" key={data} />
      ))}
      <Details data="15 Sign-up Form" type="success" />
      <Details data="Ticket & Chat Support" type="success" />
      <Details data="Automation" type="success" />
      <Details data="Dedicated IPs (coming soon)" type="success" />
    </Flex>
  );
};
