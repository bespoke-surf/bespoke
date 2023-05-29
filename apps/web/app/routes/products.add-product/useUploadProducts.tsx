import { useRouteLoaderData } from "@remix-run/react";
import type { UploadResult, UppyFile } from "@uppy/core";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { useFormikContext } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { STORE_PREFIX, STORE_PRODUCT_IMAGE_POSTFIX } from "~/constants";
import type { RootData } from "~/root";
import type { ProductImageInput } from "../../graphql/__generated__/graphql";
import { CdnType } from "../../graphql/__generated__/graphql";
import type { AddProductFormValues } from "./type";

const useUploadProducts = (): { uppy: Uppy } => {
  const { setFieldValue } = useFormikContext<AddProductFormValues>();
  const rootLoaderData = useRouteLoaderData("root") as RootData;

  const uppy = useMemo(
    () =>
      new Uppy({
        autoProceed: true,
        restrictions: {
          maxFileSize: 20000000,
          maxNumberOfFiles: 1,
          allowedFileTypes: ["image/*"],
        },
      }).use(XHRUpload, {
        endpoint: rootLoaderData.CLOUDINARY_UPLOAD_IMAGE_URL as string,
        method: "POST",
        formData: true,
        fieldName: "file",
        allowedMetaFields: ["file", "folder", "upload_preset"],
      }),
    [rootLoaderData.CLOUDINARY_UPLOAD_IMAGE_URL]
  );

  const handleFileAdded = useCallback(
    async (
      file: UppyFile<Record<string, unknown>, Record<string, unknown>>
    ) => {
      const folder = `${STORE_PREFIX}/${rootLoaderData?.user?.id}/${STORE_PRODUCT_IMAGE_POSTFIX}`;
      uppy.setFileMeta(file.id, {
        folder,
        upload_preset: rootLoaderData.CLOUDINARY_PRESET,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rootLoaderData.CLOUDINARY_PRESET, rootLoaderData?.user?.id]
  );

  const handleUploadSuccess = useCallback(
    async (result: UploadResult<Record<string, unknown>>) => {
      const productData: ProductImageInput[] = [];
      for (const success of result.successful) {
        if (!success.response?.body.secure_url) return;
        productData?.push({
          height: success.response.body.height as number,
          width: success.response.body.width as number,
          src: success.response.body.secure_url as string,
          mimeType: success.type ?? "",
          cdnType: CdnType.Cloudinary,
        });
      }
      setFieldValue("image", productData);
    },
    [setFieldValue]
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleFileAdded, handleUploadSuccess]);

  return { uppy };
};
export default useUploadProducts;
