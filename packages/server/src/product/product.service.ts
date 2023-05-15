import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import * as cloudinary from 'cloudinary';
import { Repository } from 'typeorm';
import { middleRank, nextRank } from '../utils/rank';
import { AddMoreProductImagesInput } from './dto/add-More-Porduct-Image-Input';
import { CreateProductInput } from './dto/createProductInput';
import { UpdateProductDetailsInput } from './dto/update-product-details';
import { UpdateShopifyProductInput } from './dto/updateShopifyProduct';
import { ProductSource } from './enum/productSource.enum';
import { Product } from './product.entity';
import { ShopifyProductData } from './type/shopifyProductData';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private eventEmitter: EventEmitter2,
  ) {}

  // used to trigger events
  async emitEvent(eventName: string, postId: string) {
    const getPost = await this.productRepo.findOne({
      where: { id: postId },
      relations: { store: { user: true } },
    });
    this.eventEmitter.emit(eventName, getPost);
  }

  async getProductWithName(productName: string): Promise<Product | null> {
    const production = await this.productRepo.findOne({
      where: { name: productName },
    });
    return production ?? null;
  }

  async getShopifyProductWithId(id: string): Promise<Product | null> {
    const production = await this.productRepo
      .createQueryBuilder('product')
      .where("product.productData ->> 'id' = :productId", { productId: id })
      .andWhere('product.productSource = :productSource', {
        productSource: ProductSource.SHOPIFY,
      })
      .getOne();
    return production ?? null;
  }

  async getProductCount(subdomain: string): Promise<number> {
    return await this.productRepo.count({
      where: {
        store: {
          subdomain,
        },
      },
    });
  }

  async getProducts(
    subdomain: string,
    take: number,
    skip: number,
  ): Promise<Product[]> {
    const production = await this.productRepo.find({
      where: { store: { subdomain } },
      order: { rank: 'ASC' },
      take,
      skip,
    });

    return production;
  }

  async getProduct(productId: string): Promise<Product | null> {
    if (!productId) return null;
    const product = await this.productRepo
      .createQueryBuilder('product')
      .where('product.id =:productId', { productId })
      .leftJoinAndSelect('product.modifier', 'modifier')
      .leftJoinAndSelect('modifier.modifierSet', 'modifierSet')
      .orderBy('product.createdAt', 'ASC')
      .addOrderBy('modifier.rank', 'ASC')
      .addOrderBy('modifierSet.rank', 'ASC')
      .getOne();

    return product ?? null;
  }

  async createProduct(input: CreateProductInput): Promise<Product | null> {
    try {
      const product = await this.productRepo.find({
        where: { storeId: input.storeId },
        order: {
          rank: 'ASC',
        },
      });

      const production = {
        name: input.name,
        price: input.price,
        storeId: input.storeId,
        productType: input.type,
        image: input.image,
        externalLink: input.externalLink,
        productSource: input.productSource,
      };

      const nextRankProdct = product[product.length - 1];

      const newProduction = await (nextRankProdct
        ? this.productRepo.save({
            ...production,
            rank: nextRank(nextRankProdct.rank),
          })
        : this.productRepo.save({
            ...production,
            rank: middleRank(),
          }));

      return newProduction ?? null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async createShopifyProduct(
    input: CreateProductInput,
    productData: ShopifyProductData,
  ): Promise<null> {
    const product = await this.createProduct(input);
    if (product) {
      await this.productRepo.update(product?.id, {
        productData,
      });
    }
    return null;
  }
  async updateShopifyProduct(
    input: UpdateShopifyProductInput,
    productData: ShopifyProductData,
  ): Promise<null> {
    const { id, ...rest } = input;
    await this.productRepo.update(id, {
      ...rest,
      productData,
    });
    return null;
  }

  // async deleteProductFile(
  //   input: DeleteProductFileInput,
  //   userId: string,
  // ): Promise<Product | null> {
  //   const product = await this.productRepo.findOneBy({ id: input.productId });
  //   if (!product) return null;

  //   if (product.files?.some(({ fileName }) => fileName === input.file)) {
  //     const parameters = {
  //       Bucket: `${process.env.S3_BUCKET_NAME}/${userId}/${input.productId}`,
  //       Key: input.file,
  //     };
  //     const s3 = this.s3Service.getS3();
  //     s3.deleteObject(parameters, (error) => {
  //       if (error) {
  //         console.log(error, error.stack);
  //       } else {
  //         return true;
  //       }
  //       return false;
  //     });
  //   } else {
  //     return null;
  //   }

  //   const updateFiles = product.files?.filter(
  //     (file) => file.fileName !== input.file,
  //   );

  //   await this.productRepo.update(product.id, {
  //     files: updateFiles,
  //     productType: ProductType.DIGITAL_PRODUCT,
  //   });

  //   const updated = await this.productRepo.findOneBy({ id: product.id });
  //   return updated ?? null;
  // }

  async toggleProductHidden(productId: string): Promise<boolean> {
    try {
      const product = await this.productRepo.findOneBy({ id: productId });

      if (!product?.id) return false;

      await this.productRepo.update(product?.id, {
        hidden: !product?.hidden,
      });
      return true;
    } catch {
      return false;
    }
  }

  async updateProductDetails(
    input: UpdateProductDetailsInput,
  ): Promise<Product | null> {
    const product = await this.productRepo.findOneBy({ id: input.productId });
    if (!product) return null;

    await this.productRepo.update(product.id, {
      name: input.name,
      description: input.description,
      price: input.price * 100,
      productType: input.productType,
    });

    // if (
    //   input.hours !== null &&
    //   input.hours !== undefined &&
    //   input.minutes !== null &&
    //   input.minutes !== undefined
    // ) {
    //   await this.productRepo.update(product.id, {
    //     duration: {
    //       hours: input.hours,
    //       minutes: input.minutes,
    //     },

    //     productType: ProductType.SERVICE,
    //   });
    // }
    const updated = await this.productRepo.findOneBy({ id: product.id });
    return updated ?? null;
  }

  async addMoreProductImages(
    input: AddMoreProductImagesInput,
  ): Promise<Product | null> {
    const product = await this.productRepo.findOneBy({ id: input.productId });

    if (!product) return null;

    await this.productRepo.update(input.productId, {
      image: [...(product.image ? product.image : []), ...input.image],
    });

    const updatedProduct = await this.productRepo.findOneBy({ id: product.id });

    return updatedProduct ?? null;
  }

  async deleteProductImage(
    deletingUrl: string,
    productId: string,
  ): Promise<Product | null> {
    const product = await this.productRepo.findOneBy({ id: productId });

    if (!product) return null;

    const updateImage = product.image?.filter(({ src }) => src !== deletingUrl);

    await this.productRepo.save({
      id: productId,
      image: updateImage,
    });

    const index = deletingUrl.lastIndexOf('store');
    const id = deletingUrl.slice(Math.max(0, index)).split('.')[0];
    if (id) {
      cloudinary.v2.uploader.destroy(id, { resource_type: 'image' });
    }

    const updated = await this.productRepo.findOneBy({ id: product.id });

    return updated ?? null;
  }

  async deleteProduct(productId: string): Promise<null> {
    const production = await this.productRepo.findOne({
      where: {
        id: productId,
      },
    });
    if (!production) return null;

    // production.image?.map((data) => {
    //   const index = data.src.lastIndexOf('store');
    //   const id = data.src.slice(Math.max(0, index)).split('.')[0];
    //   cloudinary.v2.uploader.destroy(id, {
    //     resource_type: data.mimeType.includes('video') ? 'video' : 'image',
    //   });
    // });

    await this.productRepo.delete(productId);

    // if (res.affected && res.affected > 0) {
    //   const s3 = this.s3Service.getS3();

    //   emptyS3Directory(
    //     process.env.S3_BUCKET_NAME,
    //     `${userId}/${productId}/`,
    //     s3,
    //   ).catch((err) => {
    //     console.log(err);
    //   });
    // }
    return null;
  }
}
