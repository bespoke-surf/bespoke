import { Request, Response } from 'express';

export interface MyContext {
  req: Request;
  res: Response;
}

export interface EnvironmentVariables {
  PORT: string;
  NODE_ENV: 'production' | 'development';
  COOKIE_NAME: string;
  REDIS_PORT: string;
  REDIS_HOST: string;
  REDIS_PASSWORD: string;
  S3_BUCKET_ACCESS_KEY_ID: string;
  S3_BUCKET_SECRET_ACCESS_KEY: string;
  S3_BUCKET_REGION: string;
  S3_BUCKET_NAME: string;
  SHOPIFY_API_KEY: string;
  SHOPIFY_API_SECRET_KEY: string;
  HOST: string;
  FRONTEND_HOST: string;
  FRONTEND_HOST_PROTOCOL: string;
  SESSION_SECRET: string;
  DATABASE_URL: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  STRIPE_BASIC_PRODUCT_ID: string;
  STRIPE_ADVANCED_PRODUCT_ID: string;
  SENTRY_DSN: string;
  POSTHOG_KEY: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  PRIMARY_REGION: string;
  FLY_REGION: string;
}
