import { createCookie } from "@remix-run/node";

export const subdomainPopupCookie = createCookie("subdomainPopupCookie", {
  httpOnly: true,
  sameSite: "lax",
  maxAge: 604_800,
  path: "/",
  secure: ENV.MODE === "production", // enable this in prod only
});

export interface ISubdomainPopupCookie {
  lastPoupData?: string;
}
