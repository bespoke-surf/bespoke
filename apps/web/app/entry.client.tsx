import { RemixBrowser, useLocation, useMatches } from "@remix-run/react";
import * as Sentry from "@sentry/remix";
import type { Integration } from "@sentry/types";
import posthog from "posthog-js";
import { StrictMode, startTransition, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";

if (
  ENV.MODE === "production" &&
  ENV.SENTRY_DSN &&
  ENV.POSTHOG_TOKEN &&
  ENV.POSTHOG_ORGANISATION &&
  ENV.POSTHOG_PROJECT_ID
) {
  posthog.init(String(ENV.POSTHOG_TOKEN), {
    api_host: "https://app.posthog.com",
  });

  Sentry.init({
    dsn: ENV.SENTRY_DSN,
    tracesSampleRate: 1,
    environment: ENV.MODE,
    replaysOnErrorSampleRate: 1.0,
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
        ENV.POSTHOG_ORGANISATION,
        Number(ENV.POSTHOG_PROJECT_ID)
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
