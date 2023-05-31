import { RemixBrowser, useLocation, useMatches } from "@remix-run/react";
import * as Sentry from "@sentry/remix";
import type { Integration } from "@sentry/types";
import posthog from "posthog-js";
import { StrictMode, startTransition, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import { getEnvVars } from "../env.server";

if (process.env.NODE_ENV === "production") {
  const {
    POSTHOG_TOKEN,
    POSTHOG_ORGANISATION,
    POSTHOG_PROJECT_ID,
    SENTRY_DSN,
  } = getEnvVars();

  posthog.init(String(POSTHOG_TOKEN), {
    api_host: "https://app.posthog.com",
  });

  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 1,
    environment: process.env.NODE_ENV,
    replaysOnErrorSampleRate: 0.1,
    replaysSessionSampleRate: 0.1,
    attachStacktrace: true,
    integrations: [
      new Sentry.Replay(),
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.remixRouterInstrumentation(
          useEffect,
          useLocation,
          useMatches
        ),
      }),
      new posthog.SentryIntegration(
        posthog,
        POSTHOG_ORGANISATION,
        Number(POSTHOG_PROJECT_ID)
      ) as Integration,
    ],
  });
}

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    );
  });
}

if (typeof requestIdleCallback === "function") {
  requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1);
}
