import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Box, Flex, Module, PageHeader, Text } from "gestalt";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import AdjustPlan from "./AdjustPlan";
import CalloutErrors from "./CalloutErrors";
import ContactUsage from "./ContactUsage";
import type { GrowthPathChooseData } from "./types";
import { PlanChooseActionEnum } from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Unlock Growth Path -| ${rootData.store?.name}`,
    description: "Unlock growth path to start earning rewards",
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

  if (action === PlanChooseActionEnum.createCheckoutSessionUrl) {
    // const contactQuantity = formData.get("contactQuantity");
    // const response = await sdk.CreateCheckoutSessionUrl(
    //   {
    //     contactQuantity: Number(contactQuantity),
    //     subdomain,
    //   },
    //   { request }
    // );
    // if (response.createCheckoutSessionUrl) {
    //   return redirect(response.createCheckoutSessionUrl);
    // }
  }

  if (action === PlanChooseActionEnum.createShopifyAppSubscription) {
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
  return (
    <>
      <PageHeader
        borderStyle="none"
        title="GROWTH PLAN"
        subtext="Subscription plan to supercharge your business for growth"
      />
      <Flex justifyContent="center">
        <Box width="92.5%" paddingY={6}>
          <CalloutErrors />

          <ContactUsage />

          <Box marginTop={6} />

          <AdjustPlan />
          <Box marginTop={6} />
          <FreeBenefits />
        </Box>
      </Flex>
    </>
  );
}

const FreeBenefits = () => {
  return (
    <Module id="" title="FREE TO INSTALL" type="info">
      <Flex direction="column" gap={6}>
        <Flex direction="column" gap={3}>
          {/* <Text weight="bold" color="dark">
                CUSTOMERS
              </Text> */}

          <Flex direction="column" gap={2}>
            <Text size="300" color="dark">
              Upto 250 Customers, Newsletter, Signup Forms
            </Text>
            {/* <Text size="200" color="dark">
                  {numberWithCommas(
                    perContact ? contacts * 10 : closest[0]?.value ?? 0
                  )}{" "}
                  EMAIL SENDS
                </Text> */}
          </Flex>
          <Text inline size="400" weight="bold" color="dark">
            Free
          </Text>
        </Flex>
        <Text weight="bold">No monthly payment</Text>
      </Flex>
    </Module>
  );
};
