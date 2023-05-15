import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "react-router";

import { sdk } from "../../graphql/graphqlWrapper.server";
import { isPrivateRoute } from "../../utils/utils.server";
import type { AutomationWorkflowData } from "./types";

export async function loader({ params, request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  const workflowId = params.workflowId as string;

  const response = await Promise.all([
    sdk.getWorkflow(
      {
        workflowId,
      },
      { request }
    ),
  ]);

  const workflow = response[0];

  let headers = new Headers();

  return json<AutomationWorkflowData>(
    {
      workflow: workflow.getWorkflow,
    },
    { headers }
  );
}
