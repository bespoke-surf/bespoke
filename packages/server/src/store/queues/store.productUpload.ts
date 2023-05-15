import { InjectShopify } from '@nestjs-shopify/core';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import {
  GraphqlQueryError,
  Session,
  Shopify as ShopifyApi,
} from '@shopify/shopify-api';
import { RestResources } from '@shopify/shopify-api/rest/admin/2023-01';
import { Job } from 'bull';
import {
  GetProductsQuery,
  GetProductsQueryVariables,
} from '__generated__/shopify-types';
import { GET_PRODUCTS_QUERY } from '../../../graphql/products.graphql';
import { STORE_PRODUCT_UPLOAD_QUEUE } from '../../constants';
import { EventAccessRestriction } from '../../event/enum/eventConfidentiality';
import { EventState } from '../../event/enum/eventState.enum';
import { EventType } from '../../event/enum/eventType.enum';
import { EventService } from '../../event/event.service';
import { ProductImageInput } from '../../product/dto/productImageInput';
import { CDNType } from '../../product/enum/cdnType.enum';
import { ProductSource } from '../../product/enum/productSource.enum';
import { ProductType } from '../../product/enum/productType.enum';
import { ProductService } from '../../product/product.service';
import { ShopifyProductData } from '../../product/type/shopifyProductData';
import { ShopifyService } from '../../shopify/shopify.service';
import { SseService } from '../../sse/sse.service';
import { delay } from '../../utils/delay';
import { StoreService } from '../store.service';
@Processor(STORE_PRODUCT_UPLOAD_QUEUE)
export class StoreProductUploadProcessor {
  constructor(
    private readonly shopifyService: ShopifyService,
    private readonly storeService: StoreService,
    private readonly productService: ProductService,
    private readonly eventService: EventService,
    private readonly sseService: SseService,
    @InjectShopify()
    private readonly shopifyApi: ShopifyApi<RestResources>,
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

      const productCount = (await this.shopifyApi.rest.Product.count({
        session,
      })) as {
        count: number;
      };

      const graphqlClient = new this.shopifyApi.clients.Graphql({ session });

      let progress = 0;
      const count = productCount.count;

      const addProducts = (product: GetProductsQuery['products']['edges'][0]) =>
        new Promise((resolve, reject) => {
          this.productService
            .getShopifyProductWithId(product.node.id)
            .then((data) => {
              progress += 1;
              const p = progress;
              const percent = (p / count) * 100;
              const productImage: ProductImageInput[] = [];
              product.node.images.edges.map((image) => {
                productImage.push({
                  mimeType: 'image/png',
                  height: Math.ceil(image.node.height ?? 0),
                  src: image.node.url,
                  width: Math.ceil(image.node.width ?? 0),
                  cdnType: CDNType.SHOPIFY,
                });
              });
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { images: __, ...rest } = product.node;
              const productData: ShopifyProductData = {
                ...rest,
              };
              const baseProduct = {
                image: productImage,
                name: product.node.title,
                price: product.node.variants.edges[0]?.node.price * 100,
                externalLink: `https://${session.shop}/products/${product.node.handle}`,
              };
              if (!data) {
                this.productService
                  .createShopifyProduct(
                    {
                      ...baseProduct,
                      storeId: shopify.integration.store.id,
                      type: ProductType.EXTERNAL_LINK,
                      productSource: ProductSource.SHOPIFY,
                    },
                    productData,
                  )
                  .then(() => {
                    // TODO: temp fix ,need to move this to onQueProgress
                    this.sseService.addEvent({
                      data: {
                        message: String(percent),
                        state: EventState.ACTIVE,
                      },
                      type: EventType.SHOPIFY_PRODUCT_SYNC_PROGRESS,
                      id: shopify.integration.store.subdomain,
                      retry: 1,
                    });

                    resolve(undefined);
                  });
              } else {
                this.productService
                  .updateShopifyProduct(
                    {
                      id: data.id,
                      ...baseProduct,
                    },
                    productData,
                  )
                  .then(() => {
                    this.sseService.addEvent({
                      data: {
                        message: String(percent),
                        state: EventState.ACTIVE,
                      },
                      type: EventType.SHOPIFY_PRODUCT_SYNC_PROGRESS,
                      id: shopify.integration.store.subdomain,
                      retry: 1,
                    });
                    resolve(undefined);
                  });
              }
            })
            .catch((error) => reject(error));
        });

      const promises = [];
      let hasNextPage = false;
      let cursor = null;
      do {
        const response = await graphqlClient.query({
          data: {
            query: GET_PRODUCTS_QUERY,
            variables: {
              first: 10,
              after: cursor,
            } as GetProductsQueryVariables,
          },
        });

        const products = response.body as { data: GetProductsQuery };

        for (const product of products.data.products.edges) {
          promises.push(addProducts(product));
        }
        hasNextPage = products.data.products.pageInfo.hasNextPage;
        cursor = products.data.products.pageInfo.endCursor;
        if (hasNextPage) {
          await delay(5000);
        }
      } while (hasNextPage);

      return await Promise.all(promises);
    } catch (error) {
      console.log(JSON.stringify(error));
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

    await this.shopifyService.updateShopifyProductSyncJobId(
      shopify.id,
      String(job?.id),
    );

    await this.eventService.createEvent({
      eventType: EventType.SHOPIFY_PRODUCT_SYNC,
      message: 'Your Shopify store product sync has started',
      link: '/integrations/shopify',
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

    await this.storeService.stopShopifyProductSync(shopify.id);
    await this.eventService.createEvent({
      eventType: EventType.SHOPIFY_PRODUCT_SYNC,
      message: 'Your Shopify store product sync has completed',
      link: '/products',
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

    await this.storeService.stopShopifyProductSync(shopify.id);

    await this.eventService.createEvent({
      eventType: EventType.SHOPIFY_PRODUCT_SYNC,
      message: 'Your Shopify store product sync has failed. Try after 60s',
      userId: shopify?.integration?.store?.user.id,
      subdomain: shopify.integration.store.subdomain,
      eventState: EventState.FAILED,
      eventProducerId: shopify.id,
      showAsNotification: true,
      eventAccessRestriction: EventAccessRestriction.HIGH,
    });
  }
}
