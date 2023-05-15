import type { LoaderArgs } from "@remix-run/node";
import isNil from "lodash/isNil";
import omitBy from "lodash/omitBy";
import papaparse from "papaparse";

import { sdk } from "../../graphql/graphqlWrapper.server";
import type { SubscriberFragment } from "../../graphql/__generated__/graphql";
import { isPrivateRoute } from "../../utils/utils.server";

export async function loader({ request, params }: LoaderArgs) {
  await isPrivateRoute(request);

  const subscriberId = params.subscriberId as string;

  const respnose = await Promise.all([
    sdk.GetSubscriber(
      {
        subscriberId,
      },
      { request, forbiddenRedirect: "/" }
    ),
  ]);

  const subscriber = respnose[0].getSubscriber;

  const copiedSub: Partial<SubscriberFragment> | null | undefined = omitBy(
    subscriber,
    isNil
  );

  delete copiedSub?.subscriberAddress;
  delete copiedSub?.user;
  delete copiedSub?.userId;
  delete copiedSub?.id;
  delete copiedSub?.storeId;

  const csv = papaparse.unparse([copiedSub]);

  const csvData = new Blob([csv]);

  return new Response(csvData, {
    status: 200,
    headers: {
      "Content-Type": "text/csv;charset=utf-8;",
    },
  });
}
