import invariant from "tiny-invariant";

const requiredServerEnvs = [
  "NODE_ENV",
  "FLY_BACKEND_HOST",
  "OPEN_SOURCE",
  "FRONTEND_HOST",
  "BACKEND_HOST",
  "CLOUDINARY_UPLOAD_IMAGE_URL",
  "CLOUDINARY_PRESET",
  "UNLAYER_PROJECT_ID",
  //   "SENTRY_DSN",
  //   "POSTHOG_TOKEN",
  //   "POSTHOG_ORGANISATION",
  //   "POSTHOG_PROJECT_ID",
] as const;

declare global {
  namespace NodeJS {
    interface ProcessEnv
      extends Record<(typeof requiredServerEnvs)[number], string> {
      OPEN_SOURCE: "true" | "false";
    }
  }
}

export function init() {
  for (const env of requiredServerEnvs) {
    invariant(process.env[env], `${env} is required`);
  }
}

/**
 * This is used in both `entry.server.ts` and `root.tsx` to ensure that
 * the environment variables are set and globally available before the app is
 * started.
 *
 * NOTE: Do *not* add any environment variables in here that you do not wish to
 * be included in the client.
 * @returns all public ENV variables
 */
export function getEnv() {
  return {
    MODE: process.env.NODE_ENV,
    OPEN_SOURCE: process.env.OPEN_SOURCE,
    BACKEND_HOST: process.env.BACKEND_HOST,
    SENTRY_DSN: process.env.SENTRY_DSN,
    POSTHOG_TOKEN: process.env.POSTHOG_TOKEN,
    POSTHOG_ORGANISATION: process.env.POSTHOG_ORGANISATION,
    POSTHOG_PROJECT_ID: process.env.POSTHOG_PROJECT_ID,
    CLOUDINARY_UPLOAD_IMAGE_URL: process.env.CLOUDINARY_UPLOAD_IMAGE_URL,
    CLOUDINARY_PRESET: process.env.CLOUDINARY_PRESET,
    UNLAYER_PROJECT_ID: process.env.UNLAYER_PROJECT_ID,
  };
}

type ENV = ReturnType<typeof getEnv>;

declare global {
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}
