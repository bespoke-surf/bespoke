import type { ActionArgs } from "@remix-run/node";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { UpdateAboutInput } from "../../graphql/__generated__/graphql";
import { AboutActionEnum } from "./types";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const action = formData.get("_action") as string;

  if (action === AboutActionEnum.updateAbout) {
    const { about, aboutId, aboutHTML, aboutLexical } = Object.fromEntries(
      formData.entries()
    ) as unknown as UpdateAboutInput;

    await sdk.UpdateAbout(
      {
        input: {
          about,
          aboutId,
          aboutHTML,
          aboutLexical,
        },
      },
      { request }
    );
  }

  return null;
}
