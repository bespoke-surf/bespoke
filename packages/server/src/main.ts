import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { RawBodyRequest, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Queue } from 'bull';
import RedisStore from 'connect-redis';
import { NextFunction, Request, Response, json } from 'express';
import expressListRoutes from 'express-list-routes';
import session from 'express-session';
import helmet from 'helmet';
import Redis from 'ioredis';
import invariant from 'tiny-invariant';
import { AppModule } from './app.module';

import { SwaggerModule } from '@nestjs/swagger';
import {
  STORE_DIALY_CRON_QUEUE,
  STORE_PRODUCT_UPLOAD_QUEUE,
  STORE_QUARTERLY_CRON_QUEUE,
  STORE_QUEST_QUEUE,
  STORE_SEND_EMAIL_TO_SUBSCRIBER_LIST_QUEUE,
  STORE_WEEKLY_CRON_QUEUE,
  STORE_WORKFLOW_QUEUE,
  USER_CUSTOMER_UPLOAD_QUEUE,
  USER_SNS_EMAIL_METRIC_WEBHOOK_QUEUE,
  USER_STORE_UPLOAD_CSV_FILE_QUEUE,
} from './constants';
import { listApiDocument, subscriberApiDocument } from './utils/openApiBuilder';

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

const PORT = process.env.PORT;

const { NODE_ENV, REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
invariant(typeof REDIS_HOST === 'string', 'redis url is missing');
invariant(typeof REDIS_PORT === 'string', 'redis port is missing');
invariant(typeof REDIS_PASSWORD === 'string', 'redis password is missing');
invariant(typeof NODE_ENV === 'string', 'MISSING NODE_ENV');

export const corsOrigin = [
  `${process.env.FRONTEND_HOST_PROTOCOL}//${process.env.FRONTEND_HOST}`,
  /^https:\/\/([a-zA-Z0-9][a-zA-Z0-9]*\.)*bespoke.surf+$/,
];

if (NODE_ENV === 'development') {
  corsOrigin.push(/^http:\/\/([a-zA-Z0-9][a-zA-Z0-9]*\.)*localhost.com:3000+$/);
  corsOrigin.push(`https://studio.apollographql.com`);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
    cors: {
      credentials: true,
      origin: corsOrigin,
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  if (NODE_ENV === 'production') {
    app.set('trust proxy', 1);
  }

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
      },
    }),
  );

  if (NODE_ENV === 'development') {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/bull-board');
    createBullBoard({
      queues: [
        STORE_PRODUCT_UPLOAD_QUEUE,
        USER_CUSTOMER_UPLOAD_QUEUE,
        STORE_SEND_EMAIL_TO_SUBSCRIBER_LIST_QUEUE,
        STORE_WORKFLOW_QUEUE,
        STORE_QUEST_QUEUE,
        STORE_DIALY_CRON_QUEUE,
        STORE_WEEKLY_CRON_QUEUE,
        STORE_QUARTERLY_CRON_QUEUE,
        USER_STORE_UPLOAD_CSV_FILE_QUEUE,
        USER_SNS_EMAIL_METRIC_WEBHOOK_QUEUE,
      ].map((queue) => new BullAdapter(app.get<Queue>(`BullQueue_${queue}`))),
      serverAdapter,
    });
    app.use('/bull-board', serverAdapter.getRouter());
  }

  app.use((request: Request, res: Response, next: NextFunction) => {
    if (
      request.path.indexOf('/store/stripe-webhook') === 0 ||
      request.path.indexOf('/app/shopify/webhooks') === 0
    ) {
      json({
        verify: (req: RawBodyRequest<Request>, _, buf) => {
          req.rawBody = buf;
        },
      })(request, res, next);
    } else {
      json()(request, res, next);
    }
  });

  app.use(
    session({
      store: new RedisStore({
        client: new Redis({
          host: REDIS_HOST,
          port: Number(REDIS_PORT),
          password: REDIS_PASSWORD,
          tls: NODE_ENV === 'production' ? {} : undefined,
        }),
      }),
      name: process.env.COOKIE_NAME,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        domain:
          NODE_ENV === 'production'
            ? process.env.FRONTEND_HOST
            : 'localhost.com',
        secure: NODE_ENV === 'production' ? true : false,
      },
    }),
  );

  if (process.env.NODE_ENV === 'development') {
    const listDoument = listApiDocument(app);
    SwaggerModule.setup('api/list', app, listDoument);
    const subscriber = subscriberApiDocument(app);
    SwaggerModule.setup('api/subscriber', app, subscriber);
  }

  await app.listen(PORT);
  console.log(`Server started at http://localhost:${PORT}/graphql`);

  if (process.env.NODE_ENV === 'development') {
    const express = app.getHttpAdapter().getInstance();
    console.log(expressListRoutes(express));
  }
}
bootstrap();
