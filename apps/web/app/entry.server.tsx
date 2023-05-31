import type { EntryContext, HandleDataRequestFunction } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as Sentry from "@sentry/remix";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { etag } from "remix-etag";
import { isPrefetch } from "remix-utils";
import { PassThrough } from "stream";
import { getEnvVars } from "../env.server";
import { routes as otherRoutes } from "./other-routes.server";

const ABORT_DELAY = 5000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const isBot = isbot(request.headers.get("user-agent"));
  const callbackName = isBot ? "onAllReady" : "onShellReady";

  if (!isBot && process.env.NODE_ENV === "production") {
    Sentry.init({
      dsn: getEnvVars().SENTRY_DSN,
      tracesSampleRate: 1,
      environment: process.env.NODE_ENV,
    });
  }

  return new Promise(async (resolve, reject) => {
    let didError = false;
    for (const handler of otherRoutes) {
      // eslint-disable-next-line no-await-in-loop
      const otherRouteResponse = await handler(request, remixContext);
      if (otherRouteResponse) resolve(otherRouteResponse);
    }
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        [callbackName]() {
          const body = new PassThrough();
          responseHeaders.set("Content-Type", "text/html");
          //@ts-ignore
          const response = new Response(body, {
            headers: responseHeaders,
            status: didError ? 500 : responseStatusCode,
          });
          resolve(etag({ request, response }));
          pipe(body);
        },
        onShellError(err: unknown) {
          reject(err);
        },
        onError(error: unknown) {
          didError = true;
          console.error(error);
        },
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

export let handleDataRequest: HandleDataRequestFunction = async (
  response: Response,
  { request }
) => {
  let isGet = request.method.toLowerCase() === "get";

  // If it's a GET request and it's a prefetch request and it doesn't have a Cache-Control header
  if (isGet && isPrefetch(request) && !response.headers.has("Cache-Control")) {
    // we will cache for 10 seconds only on the browser
    response.headers.set("Cache-Control", "private, max-age=3");
  }

  return response;
};
