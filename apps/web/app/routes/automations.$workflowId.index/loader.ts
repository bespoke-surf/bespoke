import type { AutomationWorkflowIndexData } from "./types";

import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { sdk } from "../../graphql/graphqlWrapper.server";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";

export async function loader({ request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  const subdomain = getSubdomain(request);
  if (!subdomain) return redirect("/");

  const respnose = await Promise.all([
    sdk.GetLists(
      {
        subdomain,
      },
      { request }
    ),
    sdk.GetIntegrationWithSubdomain({ subdomain }, { request }),
    sdk.GetEmailTemplates({ subdomain }, { request }),
  ]);

  console.log(respnose[0].getLists);

  const list = respnose[0];
  const integration = respnose[1];

  return json<AutomationWorkflowIndexData>({
    lists: list.getLists,
    integration: integration.getIntegrationWithSubdomain,
    emailTemplates: respnose[2].getEmailTemplates,
  });
}
