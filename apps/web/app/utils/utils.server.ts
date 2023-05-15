import { redirect } from "@remix-run/node";
import { useMatches } from "@remix-run/react";
import { useMemo } from "react";
import { sdk } from "../graphql/graphqlWrapper.server";

const DEFAULT_REDIRECT = "/";

export const REPLACE_ALL_SPACES_REGEX = /\s+/g;

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

export function getSubdomain(request: Request) {
  return new URL(request.url).hostname.split(".").at(0);
}

export function getDomain(request: Request) {
  return new URL(request.url).hostname;
}

export const isRouteOnUserSubdomain = (request: Request) => {
  const url = new URL(request.url);
  const hostname = url.hostname;
  const hosts = hostname.split(".");
  if (hosts[0] === "www" || hosts[1] === "www") return false;
  const hostnameLength = hosts.length;
  const isOnSubdomain = hostnameLength === 3 ? true : false;
  return isOnSubdomain ?? false;
};

export const redirectToSubdomain = (
  request: Request,
  subdomain: string | undefined,
  path: string
) => {
  const url = new URL(request.url);
  const isHostOnsubdomain = isRouteOnUserSubdomain(request);

  let host = url.host;

  if (isHostOnsubdomain) {
    const splited = url.host.split(".");
    splited.shift();
    host = splited.join(".");
  }

  // somethimes the user says www.locahost.com
  // remove the www
  if (host.split(".")[0] === "www") {
    const splited = url.host.split(".");
    splited.shift();
    host = splited.join(".");
  }

  return redirect(`${url.protocol}//${subdomain}.${host}${path ? path : ""}`);
};

export function isMobile(userAgent: string) {
  return /android|blackberry|iphone|ipad|ipod|opera mini|iemobile|wpdesktop/i.test(
    userAgent
  );
}

export const isPrivateRoute = async (
  request: Request,
  removeForbidden = false
): Promise<boolean> => {
  const subdomain = getSubdomain(request);
  const respnose = await Promise.all([
    sdk.Me(
      {},
      { request, forbiddenRedirect: removeForbidden ? undefined : "/" }
    ),
    sdk.GetStoreWithSubdomain(
      { subdomain: subdomain ?? "" },
      { request, forbiddenRedirect: removeForbidden ? undefined : "/" }
    ),
  ]);

  const user = respnose[0];
  const store = respnose[1].getStoreWithSubdomain;

  const isUserSubdomain =
    user.me && store && user?.me?.id === store?.userId ? true : false;

  if (!isUserSubdomain) {
    return false;
  }
  return true;
};

export const setCookieShopifyAuth = async (request: Request) => {
  const url = new URL(request.url);
  const integration = url.searchParams.get("integration");
  const setCookie = url.searchParams.get("set_cookie");

  if (integration !== "shopify" || !setCookie) return null;
  return redirect("/", { headers: { "Set-Cookie": setCookie } });
};
