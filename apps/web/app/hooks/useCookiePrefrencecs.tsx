import posthog from "posthog-js";
import { useCallback, useEffect, useState } from "react";
import { ANALYTICS_COOKIE_KEY, MARKETING_COOKIE_KEY } from "../constants";

export const useCookiePrefrences = (): {
  marketingCookie: "true" | "false";
  analyticsCookie: "true" | "false";
  toggleMarketingCookie: () => void;
  toggleAnalyticsCookie: () => void;
} => {
  const [marketingCookie, updateMrketingCookie] = useState<"true" | "false">(
    "true"
  );
  const [analyticsCookie, updateAnalyticsCookie] = useState<"true" | "false">(
    "true"
  );

  useEffect(() => {
    const marketingValue = localStorage.getItem(MARKETING_COOKIE_KEY);
    const analyticsValue = localStorage.getItem(ANALYTICS_COOKIE_KEY);
    updateMrketingCookie(
      marketingValue === null ? "true" : (marketingValue as "true" | "false")
    );
    updateAnalyticsCookie(
      analyticsValue === null ? "true" : (analyticsValue as "true" | "false")
    );
  }, [marketingCookie]);

  const setMarketingCookie = useCallback(() => {
    if (marketingCookie === "true") {
      updateMrketingCookie("false");
      localStorage.setItem(MARKETING_COOKIE_KEY, "false");
    } else {
      updateMrketingCookie("true");
      localStorage.setItem(MARKETING_COOKIE_KEY, "true");
    }
  }, [marketingCookie]);

  const setAnalyticsCookie = useCallback(() => {
    if (analyticsCookie === "true") {
      updateAnalyticsCookie("false");
      localStorage.setItem(ANALYTICS_COOKIE_KEY, "false");
      posthog.has_opted_out_capturing();
    } else {
      updateAnalyticsCookie("true");
      localStorage.setItem(ANALYTICS_COOKIE_KEY, "true");
      posthog.opt_in_capturing();
    }
  }, [analyticsCookie]);

  return {
    marketingCookie,
    analyticsCookie,
    toggleMarketingCookie: setMarketingCookie,
    toggleAnalyticsCookie: setAnalyticsCookie,
  };
};
