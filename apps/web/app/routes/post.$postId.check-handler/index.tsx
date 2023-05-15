import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { sdk } from "../../graphql/graphqlWrapper.server";
import { getSubdomain } from "../../utils/utils.server";

export const enum PostCheckHandlerActionEnum {
  checkHandleAvailable = "checkHandleAvailable",
  checkAbleToSendEmailToList = "checkAbleToSendEmailToList",
}

export async function action({ request, params }: ActionArgs) {
  const subdomain = getSubdomain(request);

  if (!subdomain) return redirect("/");

  const formData = await request.formData();

  const postId = params.postId;

  if (!postId) return null;

  const action = formData.get("_action");

  if (action === PostCheckHandlerActionEnum.checkHandleAvailable) {
    const handle = formData.get("handle") as string;

    const response = await sdk.CheckPostHandleAvailable(
      {
        handle,
        postId,
      },
      { request }
    );
    if (response.checkPostHandleAvailable) {
      return true;
    } else {
      return false;
    }
  }

  if (action === PostCheckHandlerActionEnum.checkAbleToSendEmailToList) {
    const listId = formData.get("listId") as string;

    const response = await sdk.CheckAbleToSendEmailToList(
      {
        listId,
        subdomain,
      },
      { request }
    );

    if (response.checkAbleToSendEmailToList) {
      return true;
    }
    return false;
  }

  return null;
}
