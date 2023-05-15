import type { ActionArgs } from "@remix-run/node";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { StoreCurrency } from "../../graphql/__generated__/graphql";
import { SettingsProductActionEnum } from "./types";
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const action = formData.get("_action");

  if (action === SettingsProductActionEnum.updateCurrency) {
    const currency = formData.get("currency") as StoreCurrency;
    const storeId = formData.get("storeId") as string;
    await sdk.UpdateStoreCurrency(
      {
        currency,
        storeId,
      },
      {
        request,
      }
    );
  }

  return null;
}
