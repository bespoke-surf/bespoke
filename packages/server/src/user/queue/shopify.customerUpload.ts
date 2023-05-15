import { InjectShopify } from '@nestjs-shopify/core';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { GraphqlQueryError, Session, Shopify } from '@shopify/shopify-api';
import { RestResources } from '@shopify/shopify-api/rest/admin/2023-01';
import { Job } from 'bull';
import {
  GetCustomersQuery,
  GetProductsQueryVariables,
} from '__generated__/shopify-types';
import { GET_CUSTOMERS_QUERY } from '../../../graphql/customers.graphql';
import { USER_CUSTOMER_UPLOAD_QUEUE } from '../../constants';
import { EventAccessRestriction } from '../../event/enum/eventConfidentiality';
import { EventState } from '../../event/enum/eventState.enum';
import { EventType } from '../../event/enum/eventType.enum';
import { EventService } from '../../event/event.service';
import { ShopifyService } from '../../shopify/shopify.service';
import { SseService } from '../../sse/sse.service';
import { EmailConcentCollectedFrom } from '../../subscriber-list/enum/emailConcentCollectedFrom.enum';
import { EmailConcentOptInLevel } from '../../subscriber-list/enum/emailConcentOptInLevel.enum';
import { SubscriberService } from '../../subscriber/subscriber.service';
import { delay } from '../../utils/delay';
import { UserService } from '../user.service';

@Processor(USER_CUSTOMER_UPLOAD_QUEUE)
export class UserCustomerUploadProcessor {
  constructor(
    private readonly shopifyService: ShopifyService,
    private readonly subscriberService: SubscriberService,
    private readonly eventService: EventService,
    private readonly userService: UserService,
    private readonly sseService: SseService,
    @InjectShopify()
    private readonly shopifyApi: Shopify<RestResources>,
  ) {}

  @Process()
  async transcode(job: Job<Session>) {
    try {
      const session = job.data;

      const shopify = await this.shopifyService.getShopifyWithStoreUrl(
        session.shop,
      );

      if (!shopify || shopify.authenticated === false) {
        return Promise.reject(
          `no shopify, authenticated:${shopify?.authenticated}`,
        );
      }

      const customerCount = (await this.shopifyApi.rest.Customer.count({
        session,
      })) as { count: number };

      const graphqlClient = new this.shopifyApi.clients.Graphql({ session });

      let progress = 0;
      const count = customerCount.count;

      const addCustomer = (
        customer: GetCustomersQuery['customers']['edges'][0],
      ) =>
        new Promise((resolve) => {
          progress += 1;
          const p = progress;
          const percent = (p / count) * 100;
          if (customer.node.email) {
            this.userService
              .addSubscriberToStore({
                email: customer.node.email,
                storeId: shopify.integration.store.id,
                firstName: customer.node.displayName.split(' ')[0],
                lastName: customer.node.displayName.split(' ')[1],
              })
              .then((subscriber) => {
                if (
                  customer.node.emailMarketingConsent?.marketingState ===
                  'SUBSCRIBED'
                ) {
                  this.shopifyService
                    .getShopifyWithStoreUrl(session.shop)
                    .then((shopify) => {
                      if (shopify?.listIdToCollectEmail && subscriber?.id) {
                        this.subscriberService.addSubscriberToList(
                          shopify?.listIdToCollectEmail,
                          subscriber.id,
                          EmailConcentCollectedFrom.IMPORT,
                          EmailConcentOptInLevel.SINGLE_OPT_IN,
                        );
                      }
                    });
                }
              })
              .then(() => {
                console.log(
                  String(percent),
                  'then cluae',
                  shopify.integration.store.subdomain,
                );
                this.sseService.addEvent({
                  data: {
                    message: String(percent),
                    state: EventState.ACTIVE,
                  },
                  type: EventType.SHOPIFY_CUSTOMER_SYNC_PROGRESS,
                  id: shopify.integration.store.subdomain,
                });

                resolve(undefined);
              });
          } else {
            console.log(
              String(percent),
              'else clause',
              shopify.integration.store.subdomain,
            );
            this.sseService.addEvent({
              data: {
                message: String(percent),
                state: EventState.ACTIVE,
              },
              type: EventType.SHOPIFY_CUSTOMER_SYNC_PROGRESS,
              id: shopify.integration.store.subdomain,
            });
            resolve(undefined);
          }
        });

      const promises = [];
      let hasNextPage = false;
      let cursor = null;
      do {
        const response = await graphqlClient.query({
          data: {
            query: GET_CUSTOMERS_QUERY,
            variables: {
              first: 10,
              after: cursor,
            } as GetProductsQueryVariables,
          },
        });

        const customers = response.body as { data: GetCustomersQuery };

        for (const customer of customers.data.customers.edges) {
          promises.push(addCustomer(customer));
        }
        hasNextPage = customers.data.customers.pageInfo.hasNextPage;
        cursor = customers.data.customers.pageInfo.endCursor;
        await delay(5000);
      } while (hasNextPage);
      return await Promise.all(promises);
    } catch (error) {
      console.log(error);
      if (error instanceof GraphqlQueryError) {
        // look at error.response for details returned from API,
        // specifically, error.response.errors[0].message
        // await job.log('job failed Graphql error');
        // await job.moveToFailed(
        //   {
        //     message: JSON.stringify((err.response.errors as any)[0].message),
        //   },
        //   true,
        // );

        return Promise.reject(new Error(`${error.message}`));
      } else {
        // await job.log('job failed else clause');
        // await job.moveToFailed({ message: JSON.stringify(err) }, true);
        return Promise.reject(new Error(JSON.stringify(error)));
      }
    }
  }

  // @OnQueueProgress()
  // async onProgress(job: Job, progress: number) {
  //   const session: SessionInterface = job.data;
  //   const shopify = await this.shopifyService.getShopifyWithStoreUrl(
  //     session.shop,
  //   );

  //   if (!shopify?.integration?.store?.id) return;
  // }

  @OnQueueActive()
  async onActive(job: Job) {
    const session: Session = job.data;
    const shopify = await this.shopifyService.getShopifyWithStoreUrl(
      session.shop,
    );

    if (!shopify?.integration?.store?.id) return;

    await this.shopifyService.updateShopifyCustomerSyncJobId(
      shopify.id,
      String(job?.id),
    );

    await this.eventService.createEvent({
      eventType: EventType.SHOPIFY_CUSTOMER_SYNC,
      message: 'Your Shopify store customer sync has started',
      userId: shopify?.integration?.store?.user.id,
      subdomain: shopify.integration.store.subdomain,
      eventState: EventState.ACTIVE,
      eventProducerId: shopify.id,
      showAsNotification: true,
      eventAccessRestriction: EventAccessRestriction.HIGH,
    });
  }

  @OnQueueCompleted()
  async onCompleted(job: Job) {
    const session: Session = job.data;
    const shopify = await this.shopifyService.getShopifyWithStoreUrl(
      session.shop,
    );

    if (!shopify?.integration?.store?.id) return;

    await this.userService.stopShopifyCustomerSync(shopify.id);

    await this.eventService.createEvent({
      eventType: EventType.SHOPIFY_CUSTOMER_SYNC,
      message: 'Your Shopify store customer sync has completed',
      userId: shopify?.integration?.store?.user.id,
      subdomain: shopify.integration.store.subdomain,
      eventState: EventState.COMPLETED,
      eventProducerId: shopify.id,
      showAsNotification: true,
      eventAccessRestriction: EventAccessRestriction.HIGH,
    });
  }

  @OnQueueFailed()
  async onFailed(job: Job) {
    const session: Session = job.data;
    const shopify = await this.shopifyService.getShopifyWithStoreUrl(
      session.shop,
    );

    if (!shopify?.integration?.store?.id) return;

    await this.userService.stopShopifyCustomerSync(shopify.id);

    await this.eventService.createEvent({
      eventType: EventType.SHOPIFY_CUSTOMER_SYNC,
      message: 'Your Shopify store customer sync has failed. Try after 60s',
      userId: shopify?.integration?.store?.user.id,
      subdomain: shopify.integration.store.subdomain,
      eventState: EventState.FAILED,
      eventProducerId: shopify.id,
      showAsNotification: true,
      eventAccessRestriction: EventAccessRestriction.HIGH,
    });
  }
}
