import { getParams } from "remix-params-helper";
import { z } from "zod";

const envSchema = z.object({
  FRONTEND_HOST: z.string(),
  BACKEND_HOST: z.string(),
  FLY_BACKEND_HOST: z.string(),
  SENTRY_DSN: z.string(),
  POSTHOG_TOKEN: z.string(),
  POSTHOG_ORGANISATION: z.string(),
  POSTHOG_PROJECT_ID: z.number(),
  CLOUDINARY_UPLOAD_IMAGE_URL: z.string(),
  CLOUDINARY_PRESET: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_S3_BUCKET_REGION: z.string(),
  AWS_S3_BUCKET: z.string(),
  CLOUDFRONT: z.string(),
  SENTRY_AUTH_TOKEN: z.string(),
  SENTRY_ORG: z.string(),
  SENTRY_PROJECT: z.string(),
  OPEN_SOURCE: z.boolean(),
});

export type EnvVars = z.infer<typeof envSchema>;

declare global {
  var __env__: EnvVars;
}

let env: EnvVars;

if (process.env.NODE_ENV === "production") {
  env = initEnvVars();
} else {
  if (!global.__env__) {
    global.__env__ = initEnvVars();
  }
  env = global.__env__;
}

function initEnvVars(): EnvVars {
  const { data, errors } = getParams(
    process.env as Record<string, string>,
    envSchema
  );
  if (errors) {
    throw new Error(JSON.stringify(errors));
  }
  return data;
}

export function getEnvVars(): EnvVars {
  return env;
}
