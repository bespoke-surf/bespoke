import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { MetricType } from "../../graphql/__generated__/graphql";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import { ALL_METRIC_VALUE } from "../automations.$workflowId.index/metricTypes";
import type { SubscribersSubscriberIndexData } from "./types";
import { SUBSCRIBERS_METRIC_TAKE } from "./types";

export async function loader({ params, request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  const subdomain = getSubdomain(request);
  if (!subdomain) return redirect("/");
  const subscriberId = params.subscriberId as string;

  if (!subscriberId) return redirect("/subscriber");

  const parsedUrl = new URL(request.url).searchParams;

  const skip = parsedUrl.get("skip") ? Number(parsedUrl.get("skip")) : 0;
  const type = parsedUrl.get("type")
    ? (parsedUrl.get("type") as MetricType)
    : ALL_METRIC_VALUE;

  const response = await Promise.all([
    sdk.GetEmailReceivedCount({ subscriberId }, { request }),
    sdk.GetEmailOpenedCount({ subscriberId }, { request }),
    sdk.GetEmailLinkClickedCount({ subscriberId }, { request }),
    sdk.GetPlacedOrderCount({ subscriberId }, { request }),
    sdk.GetFulfilledOrderCount({ subscriberId }, { request }),
    sdk.GetSubscriberMetrics(
      {
        subscriberId,
        skip,
        take: SUBSCRIBERS_METRIC_TAKE,
        metricType: type === ALL_METRIC_VALUE ? undefined : type,
        allMetric: type === ALL_METRIC_VALUE ? true : false,
      },
      { request }
    ),
    sdk.GetIntegrationWithSubdomain(
      {
        subdomain,
      },
      { request }
    ),
  ]);

  const emailReceivedCount = response[0].getEmailReceivedCount;
  const emailOpenedCount = response[1].getEmailOpenedCount;
  const emailLinkClickedCount = response[2].getEmailLinkClickedCount;
  const placedOrderCount = response[3].getPlacedOrderCount;
  const fulfilledOrderCount = response[4].getFulfilledOrderCount;
  const metrics = response[5].getSubscriberMetrics;
  const integration = response[6].getIntegrationWithSubdomain;

  return json<SubscribersSubscriberIndexData>({
    emailLinkClickedCount,
    emailOpenedCount,
    emailReceivedCount,
    fulfilledOrderCount,
    placedOrderCount,
    metrics,
    integration,
  });
}
