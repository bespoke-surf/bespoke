import { bespokePricingPlan } from "@bespoke/common/dist/pricingPlan";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import type { SignupFormsData } from "./types";

export default function useSignupFormLimitReached() {
  const loaderData = useLoaderData<SignupFormsData>();

  const [limitReached, setLimitReached] = useState(false);

  const planType = useMemo(
    () =>
      bespokePricingPlan.find(
        ({ id }) => id === loaderData.billing?.bespokePlanId
      )?.type,
    [loaderData.billing?.bespokePlanId]
  );

  useEffect(() => {
    if (planType === "default") {
      const count = loaderData.forms?.length;
      if (count && count >= 1) {
        setLimitReached(true);
      }
    }
    if (planType === "basic") {
      const count = loaderData.forms?.length;
      if (count && count >= 5) {
        setLimitReached(true);
      }
    }
    if (planType === "advanced") {
      const count = loaderData.forms?.length;
      if (count && count >= 15) {
        setLimitReached(true);
      }
    }
  }, [loaderData.forms?.length, planType]);

  return { limitReached, planType };
}
