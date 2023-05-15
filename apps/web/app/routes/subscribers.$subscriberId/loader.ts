import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import AddressFormatter from "@shopify/address";
import { sdk } from "../../graphql/graphqlWrapper.server";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import type { SubscribersSubscriberData } from "./types";

export async function loader({ params, request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  const subdomain = getSubdomain(request);
  if (!subdomain) return redirect("/");
  const subscriberId = params.subscriberId as string;

  if (!subscriberId) return redirect("/subscriber");

  const response = await Promise.all([
    sdk.GetSubscriber(
      {
        subscriberId,
      },
      { request, forbiddenRedirect: "/" }
    ),
    sdk.GetSubscriberRevenue({ subscriberId }, { request }),
  ]);

  const subscriber = response[0].getSubscriber;
  const subscriberRevenue = response[1].getSubscriberRevenue;

  const lc = subscriber?.subscriberAddress;
  const addressFormatter = new AddressFormatter("en");
  const p = lc?.country
    ? await addressFormatter.format({
        address1: lc?.address1 ? lc.address1 : "",
        address2: lc?.address2 ? lc.address2 : "",
        city: lc?.city ? lc.city : "",
        province: lc?.state ? lc.state : "",
        zip: lc?.zipCode ? lc.zipCode : "",
        country: lc?.country ? lc.country : "US",
      })
    : [];
  p.shift();
  p.shift();
  const formattedAddress = p.join("\r\n");

  return json<SubscribersSubscriberData>({
    subscriber,
    subscriberRevenue,
    formattedAddress,
  });
}
