import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ShopifyAuthModule } from '@nestjs-shopify/auth';
import { ShopifyCoreModule } from '@nestjs-shopify/core';
import { ShopifyWebhooksModule } from '@nestjs-shopify/webhooks';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bull';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphqlInterceptor, SentryModule } from '@ntegral/nestjs-sentry';
import { ApiVersion, LogSeverity } from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-01';
import cors from 'cors';
import { GraphQLJSONObject, PhoneNumberResolver } from 'graphql-scalars';
import { join } from 'node:path';
import { Migrations1684427301725 } from '../migrations/1684427301725-migrations';
import { Migrations1684584388289 } from '../migrations/1684584388289-migrations';
import { AboutModule } from './about/about.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { BillingModule } from './billing/billing.module';
import { ChallengeModule } from './challenge/challenge.module';
import { CreditModule } from './credit/credit.module';
import { EventModule } from './event/event.module';
import { ShopifyWebhookHandlers } from './handlers/shopify-webhook-handler';
import { MyShopifyAuthHandler } from './handlers/shopifyAfterAuthHandler';
import { IntegrationModule } from './integration/integration.module';
import { ItemModule } from './item/item.module';
import { ItemCategoryModule } from './itemCategory/itemCategory.module';
import { ListModule } from './list/list.module';
import { corsOrigin } from './main';
import { MetricModule } from './metric/metirc.module';
import { NotificationModule } from './notification/notification.module';
import { PostListModule } from './post-list/post-list.module';
import { PostModule } from './post/post.module';
import { PosthogModule } from './posthog/posthog.module';
import { ProductPostModule } from './product-post/product-post.module';
import { ProductModule } from './product/product.module';
import { QuestModule } from './quest/quest.module';
import { S3Module } from './s3/s3.module';
import { SesModule } from './ses/ses.module';
import { SessionModule } from './session/session.module';
import { ShopifySessionStorage } from './session/shopifySessionStorage';
import { ShopifyModule } from './shopify/shopify.module';
import { SignupFormModule } from './signup-form/signup-form.module';
import { SseModule } from './sse/sse.module';
import { StoreChallengeModule } from './store-challenge/store-challenge.module';
import { StoreItemModule } from './store-item/store-item.module';
import { StoreModule } from './store/store.module';
import { StripeModule } from './stripe/stripe.module';
import { SubscriberListModule } from './subscriber-list/subscriber-list.module';
import { SubscriberModule } from './subscriber/subscriber.module';
import { EnvironmentVariables } from './types';
import { UserModule } from './user/user.module';
import { WorkflowStateModule } from './workflow-state/workflow-state.module';
import { WorkflowTransitionModule } from './workflow-transition/workflow-transition.module';
import { WorkflowModule } from './workflow/workflow.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule.forRootAsync({
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => ({
        config: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
          tls: configService.get('NODE_ENV') === 'production' ? {} : undefined,
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => ({
        type: 'postgres',
        synchronize: false,
        autoLoadEntities: true,
        migrationsRun: true,
        useUTC: true,
        migrations: [Migrations1684427301725, Migrations1684584388289],
        url: configService.get('DATABASE_URL') as string,
        // replication: {
        //   master: {
        //   },
        //   slaves: [
        //     {
        //       url:
        //         configService.get('PRIMARY_REGION') !==
        //         configService.get('FLY_REGION')
        //           ? (configService.get('DATABASE_URL') as string).replace(
        //               '5432',
        //               '5433',
        //             )
        //           : configService.get('DATABASE_URL'),
        //     },
        //   ],
        // },
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => ({
        debug: configService.get('NODE_ENV') === 'production' ? false : true,
        playground: false,
        autoSchemaFile: join(process.cwd(), './schema.gql'),
        sortSchema: true,
        cache: 'bounded',
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        resolvers: {
          PhoneNumber: PhoneNumberResolver,
          JSONObject: GraphQLJSONObject,
        },
        context: ({ req, res }: any) => ({ req, res }),
        cors: {
          credentials: true,
          origin: corsOrigin,
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => {
        const REDIS_PASSWORD = configService.get('REDIS_PASSWORD');
        const REDIS_PORT = configService.get('REDIS_PORT');
        const REDIS_HOST = configService.get('REDIS_HOST');
        const NODE_ENV = configService.get('NODE_ENV');
        return {
          redis: {
            host: REDIS_HOST,
            port: Number(REDIS_PORT),
            password: REDIS_PASSWORD,
            // family: 6,
            tls: NODE_ENV === 'production' ? {} : undefined,
          },
        };
      },
      inject: [ConfigService],
    }),
    ShopifyCoreModule.forRootAsync({
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
        sessionStorage: ShopifySessionStorage,
      ) => {
        return {
          apiKey: configService.get('SHOPIFY_API_KEY') as string,
          apiSecretKey: configService.get('SHOPIFY_API_SECRET_KEY') as string,
          apiVersion: ApiVersion.January23,
          hostName: configService.get('HOST').replace(/https:\/\//, ''),
          isEmbeddedApp: false,
          hostScheme: 'https',
          isPrivateApp: false,
          restResources,
          logger: {
            httpRequests: false,
            level:
              configService.get('NODE_ENV') === 'production'
                ? LogSeverity.Error
                : LogSeverity.Debug,
            log: async (_, msg) => console.log(msg),
            timestamps: true,
          },
          scopes: [
            'read_products',
            // 'read_product_listings',
            'read_script_tags',
            'write_script_tags',
            'read_customers',
            'read_orders',
          ] as any,
          sessionStorage,
        };
      },
      inject: [ConfigService, ShopifySessionStorage],
      imports: [SessionModule],
    }),
    ShopifyWebhooksModule.forRoot({
      path: '/app/shopify/webhooks',
    }),
    ShopifyAuthModule.forRootAsyncOffline({
      imports: [AppModule],
      useFactory: (afterAuthHandler: MyShopifyAuthHandler) => ({
        basePath: '/app/shopify',
        afterAuthHandler,
      }),
      inject: [MyShopifyAuthHandler],
    }),
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => ({
        dsn:
          configService.get('NODE_ENV') === 'production'
            ? configService.get('SENTRY_DSN')
            : undefined,
        environment: configService.get('NODE_ENV'),
        debug: configService.get('NODE_ENV') === 'development' ? true : false,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthorizationModule,
    StoreModule,
    PostModule,
    SubscriberModule,
    ProductModule,
    S3Module,
    SignupFormModule,
    IntegrationModule,
    ShopifyModule,
    EventModule,
    SseModule,
    ListModule,
    SubscriberListModule,
    MetricModule,
    WorkflowModule,
    WorkflowStateModule,
    WorkflowTransitionModule,
    ProductPostModule,
    PostListModule,
    AboutModule,
    StripeModule,
    BillingModule,
    NotificationModule,
    PosthogModule,
    ChallengeModule,
    QuestModule,
    StoreChallengeModule,
    ItemModule,
    StoreItemModule,
    ItemCategoryModule,
    CreditModule,
    SesModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MyShopifyAuthHandler,
    ...ShopifyWebhookHandlers,
    { provide: APP_INTERCEPTOR, useFactory: () => new GraphqlInterceptor() },
  ],
  exports: [AppService, MyShopifyAuthHandler],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cors({
          origin: true,
        }),
      )
      .forRoutes({
        method: RequestMethod.GET,
        path: '/store/signup-form',
      });
  }
}
