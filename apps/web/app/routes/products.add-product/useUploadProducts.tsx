import { useRouteLoaderData } from "@remix-run/react";
import type { UploadResult, UppyFile } from "@uppy/core";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { useFormikContext } from "formik";
import { useCallback, useEffect } from "react";
import {
  CLOUDINARY_PRESET,
  CLOUDINARY_UPLOAD_IMAGE_URL,
  STORE_PREFIX,
  STORE_PRODUCT_IMAGE_POSTFIX,
} from "~/constants";
import type { RootData } from "~/root";
import type { ProductImageInput } from "../../graphql/__generated__/graphql";
import { CdnType } from "../../graphql/__generated__/graphql";
import type { AddProductFormValues } from "./type";
import { ProductsActionEnum } from "./type";
const uppy = new Uppy({
  autoProceed: true,
  restrictions: {
    maxFileSize: 20000000,
    maxNumberOfFiles: 1,
    allowedFileTypes: ["image/*"],
  },
}).use(XHRUpload, {
  endpoint: CLOUDINARY_UPLOAD_IMAGE_URL,
  method: "POST",
  formData: true,
  fieldName: "file",
  allowedMetaFields: ["file", "folder", "upload_preset"],
});

const useUploadProducts = (): { uppy: Uppy } => {
  const { setFieldValue, handleSubmit } =
    useFormikContext<AddProductFormValues>();
  const loaderData = useRouteLoaderData("root") as RootData;

  const handleFileAdded = useCallback(
    async (
      file: UppyFile<Record<string, unknown>, Record<string, unknown>>
    ) => {
      const folder = `${STORE_PREFIX}/${loaderData?.user?.id}/${STORE_PRODUCT_IMAGE_POSTFIX}`;
      uppy.setFileMeta(file.id, {
        folder,
        upload_preset: CLOUDINARY_PRESET,
      });
    },
    [loaderData?.user?.id]
  );

  const handleUploadSuccess = useCallback(
    async (result: UploadResult<Record<string, unknown>>) => {
      if (!loaderData?.store?.id) return;
      const formData = new FormData();
      formData.append("_action", ProductsActionEnum.uploadProduct);

      const productData: ProductImageInput[] = [];

      for (const success of result.successful) {
        if (!success.response?.body.secure_url) return;
        if (!success.preview) return;
        productData?.push({
          height: success.response.body.height as number,
          width: success.response.body.width as number,
          src: success.response.body.secure_url as string,
          mimeType: success.type ?? "",
          cdnType: CdnType.Cloudinary,
        });
      }
      setFieldValue("image", productData);
      handleSubmit();
    },
    [handleSubmit, loaderData?.store?.id, setFieldValue]
  );

  useEffect(() => {
    const completed = (result: UploadResult<Record<string, unknown>>) => {
      handleUploadSuccess(result);
    };
    const fileAdded = (
      file: UppyFile<Record<string, unknown>, Record<string, unknown>>
    ) => {
      handleFileAdded(file);
    };

    uppy.on("complete", completed);
    uppy.on("file-added", fileAdded);
    return () => {
      uppy.off("complete", completed);
      uppy.off("file-added", fileAdded);
    };
  }, [handleFileAdded, handleUploadSuccess]);

  return { uppy };
};
export default useUploadProducts;
