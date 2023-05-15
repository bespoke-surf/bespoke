import * as yup from "yup";
import type { ProductImage } from "~/graphql/__generated__/graphql";

export enum ProductsActionEnum {
  uploadProduct = "uploadProduct",
}

export const CreateProductShcema = yup.object().shape({
  externalLink: yup
    .string()
    .url("please add a valid url")
    .required("please add a product link"),
  name: yup.string().required("please add a product name"),
  price: yup
    .number()
    .required("please add a product price")
    .test(
      "maxDigitsAfterDecimal",
      "only 2 digitits after decimal places",
      (number) => /^\d+(\.\d{1,2})?$/.test(String(number))
    ),
  image: yup.array().of(
    yup.object({
      height: yup.number().required("image needs a height"),
      width: yup.number().required("image needs a width"),
      src: yup.string().required("image needs a src"),
      mimeType: yup.string().required("image needs a mimetype"),
      cdnType: yup.string().required("image needs a cdn type"),
    })
  ),
});

export interface AddProductFormValues {
  externalLink: string;
  name: string;
  price: number;
  image: ProductImage[];
}
