import type { ActionArgs } from "@remix-run/node";
import * as yup from "yup";
import { sdk } from "../../graphql/graphqlWrapper.server";
import {
  BuseinssProfileSettingsSchema,
  SettingsBuisnessProfileActionEnum,
} from "./types";

import { validateForm } from "~/utils/validateForm.server";
import { redirectToSubdomain } from "../../utils/utils.server";
const SubsdomainSchema = yup.object().shape({
  subdomain: yup
    .string()
    .matches(/^[a-z0-9]+$/g, "only letters and numbers")
    .required("your business URL"),
});

export async function action({ request }: ActionArgs) {
  try {
    const formData = await request.formData();
    const action = formData.get("_action");

    if (action === SettingsBuisnessProfileActionEnum.updateDisplayPicture) {
      const { height, storeId, width, url } = Object.fromEntries(
        formData.entries()
      ) as {
        height: string;
        storeId: string;
        url: string;
        width: string;
      };

      await sdk.UpdateDisplayPicture(
        {
          input: {
            height: Number(height),
            storeId,
            url,
            width: Number(width),
          },
        },
        { request }
      );
    }

    if (action === SettingsBuisnessProfileActionEnum.checkNameAvailable) {
      await validateForm(SubsdomainSchema, formData);
      const subdomain = formData.get("subdomain") as string;
      const available = await sdk.subdomainAvailable(
        { subdomain },
        { request }
      );

      if (available.subdomainAvailable) {
        return { available: true };
      }
      return { available: false };
    }
    if (action === SettingsBuisnessProfileActionEnum.updateStoreDeails) {
      const {
        storeId,
        address1,
        address2,
        city,
        country,
        senderEmail,
        name,
        senderName,
        state,
        subdomain,
        zipCode,
        about,
      } = Object.fromEntries(formData.entries()) as {
        storeId: string;
        address1: string;
        address2: string;
        city: string;
        country: string;
        name: string;
        senderName: string;
        senderAbout: string;
        subdomain: string;
        zipCode: string;
        state: string;
        senderEmail: string;
        about: string;
      };
      await validateForm(
        BuseinssProfileSettingsSchema.omit(["stateCount"]),
        formData
      );
      const response = await sdk.UpdateStoreDetails(
        {
          input: {
            address1,
            city,
            country,
            name,
            senderEmail,
            senderName,
            storeAbout: about,
            storeId,
            subdomain,
            zipCode,
            address2,
            state,
          },
        },
        { request }
      );
      if (!response.updateStoreDetails) {
        return { available: false };
      }
      if (response.updateStoreDetails.subdomain) {
        return redirectToSubdomain(
          request,
          response.updateStoreDetails.subdomain,
          "/settings/business-profile"
        );
      }
    }
    return null;
  } catch (err) {
    console.log(err);
    if (err instanceof Response) throw err;
    return { errors: err };
  }
}
