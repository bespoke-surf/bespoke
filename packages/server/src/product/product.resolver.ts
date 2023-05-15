import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../guard/authGuard';
import { HasStoreAccess } from '../guard/hasStoreAccess';
import { HasStoreAccessWithProduct } from '../guard/hasStoreAccessWithProduct';
import { AddMoreProductImagesInput } from './dto/add-More-Porduct-Image-Input';
import { CreateProductInput } from './dto/createProductInput';
import { UpdateProductDetailsInput } from './dto/update-product-details';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => Int, {
    description: 'get product count',
  })
  getProductCount(@Args('subdomain') subdomain: string): Promise<number> {
    return this.productService.getProductCount(subdomain);
  }

  @Query(() => [Product], {
    description: 'get product from category',
  })
  getProducts(
    @Args('subdomain') subdomain: string,
    @Args('take', { type: () => Int }) take: number,
    @Args('skip', { type: () => Int }) skip: number,
  ): Promise<Product[]> {
    return this.productService.getProducts(subdomain, take, skip);
  }

  @Query(() => Product, {
    description: 'get product from with product id',
  })
  getProduct(@Args('productId') productId: string): Promise<Product | null> {
    return this.productService.getProduct(productId);
  }

  @UseGuards(AuthGuard, HasStoreAccess)
  @Mutation(() => Product, {
    nullable: true,
    description: 'update multiple product images',
  })
  createProduct(
    @Args('input', { type: () => CreateProductInput })
    input: CreateProductInput,
  ): Promise<Product | null> {
    return this.productService.createProduct(input);
  }

  // @UseGuards(AuthGuard, HasStoreAccessWithProduct)
  // @Mutation(() => Product, {
  //   nullable: true,
  //   description: 'delete product file',
  // })
  // deleteProductFile(
  //   @Args('input') input: DeleteProductFileInput,
  //   @CurrentUserId() userId: string,
  // ): Promise<Product | null> {
  //   return this.productService.deleteProductFile(input, userId);
  // }

  @UseGuards(AuthGuard, HasStoreAccess, HasStoreAccessWithProduct)
  @Mutation(() => Boolean, {
    nullable: true,
    description: 'toggle product hidden',
  })
  toggleProductHidden(
    @Args('productId') productId: string,
  ): Promise<null | boolean> {
    return this.productService.toggleProductHidden(productId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithProduct)
  @Mutation(() => Product, {
    nullable: true,
    description: 'update product details',
  })
  updateProductDetails(
    @Args('input') updateProductDetails: UpdateProductDetailsInput,
  ): Promise<Product | null> {
    return this.productService.updateProductDetails(updateProductDetails);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithProduct)
  @Mutation(() => Product, {
    nullable: true,
    description: 'update product details',
  })
  addMoreProductImages(
    @Args('input')
    input: AddMoreProductImagesInput,
  ): Promise<Product | null> {
    return this.productService.addMoreProductImages(input);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithProduct)
  @Mutation(() => Product, {
    nullable: true,
    description: 'delete product image',
  })
  deleteProductImage(
    @Args('deletingUrl') deletingUrl: string,
    @Args('productId') productId: string,
  ): Promise<Product | null> {
    return this.productService.deleteProductImage(deletingUrl, productId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithProduct)
  @Mutation(() => [Product], {
    nullable: true,
    description: 'delete a product',
  })
  deleteProduct(
    @Args('productId') productId: string,
  ): Promise<Product[] | null> {
    return this.productService.deleteProduct(productId);
  }
}
