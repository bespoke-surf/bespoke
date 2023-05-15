import type { ProductFragment } from "~/graphql/__generated__/graphql";

export interface ProductData {
  products: ProductFragment[] | null | undefined;
  productCount: number | null | undefined;
}

export enum ProductActionEnum {
  createProductPost = "createProductPost",
  deleteProductPost = "deleteProductPost",
  deleteProduct = "deleteProduct",
}
