import { redirect } from "@remix-run/node";
import axios from "axios";
import type { DocumentNode } from "graphql";
import { print } from "graphql";
import invariant from "tiny-invariant";
import { getSdk } from "./__generated__/graphql";

export interface QueryOptions {
  request: Request;
  forbiddenRedirect?: string;
}

export interface GraphqlResponse<Response> {
  errors: any[];
  data: Response;
}

async function sendQuery<Response, Variables = {}>(options: {
  query: string;
  variables?: Variables;
  headers?: Headers;
  request?: Request;
}): Promise<GraphqlResponse<Response> & { headers: Headers }> {
  const { FLY_BACKEND_HOST } = process.env;
  invariant(typeof FLY_BACKEND_HOST === "string", "Backend host missing");

  const headers = new Headers(options.headers);

  headers.append("Content-Type", "application/json");
  headers.append("connection", "keep-alive");

  const cookie = options.request?.headers.get("cookie");
  if (cookie) {
    headers.append("cookie", cookie);
  }

  // return fetch(`${BACKEND_HOST}/graphql`, {
  //   method: "POST",
  //   keepalive: true,
  //   body: JSON.stringify(options),
  //   headers,
  // }).then((res) => ({
  //   ...res.json(),
  //   headers: res.headers,
  // }));

  return axios({
    url: `${FLY_BACKEND_HOST}/graphql`,
    method: "POST",
    data: JSON.stringify(options),
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      cookie: cookie,
      // "fly-prefer-region": process.env.FLY_REGION,
    },
  }).then((data) => ({
    ...data.data,
    headers: data.headers,
  }));
}

const baseSdk = getSdk(requester);

type Sdk = typeof baseSdk;
type SdkWithHeaders = {
  [k in keyof Sdk]: (
    ...args: Parameters<Sdk[k]>
  ) => Promise<Awaited<ReturnType<Sdk[k]>> & { _headers: Headers }>;
};

export const sdk: SdkWithHeaders = baseSdk as any;

function requester<R, V>(
  doc: DocumentNode,
  vars?: V,
  options?: QueryOptions
): Promise<R & { _headers: Headers }> {
  return sendQuery<R, V>({
    query: print(doc),
    variables: vars,
    request: options?.request,
  }).then((response) => {
    if (response.errors) {
      if (response.errors[0].extensions.code === "FORBIDDEN") {
        if (options?.forbiddenRedirect) {
          throw redirect(options.forbiddenRedirect);
        }
      }
    }

    return { ...response.data, _headers: new Headers(response.headers) };
  });
}
