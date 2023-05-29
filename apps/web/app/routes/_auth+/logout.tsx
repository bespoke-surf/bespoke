import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { sdk } from "../../graphql/graphqlWrapper.server";

export async function action({ request }: LoaderArgs) {
  const response = await sdk.Logout({}, { request });
  if (response.logout) {
    return redirect("/");
  }
  return null;
}
