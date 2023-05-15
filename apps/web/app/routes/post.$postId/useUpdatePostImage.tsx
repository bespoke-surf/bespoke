import { useRouteLoaderData } from "@remix-run/react";
import type { UploadResult, UppyFile } from "@uppy/core";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { useFormikContext } from "formik";
import { useCallback, useEffect, useState } from "react";
import {
  CLOUDINARY_PRESET,
  CLOUDINARY_UPLOAD_IMAGE_URL,
  STORE_PREFIX,
  STORE_PRODUCT_IMAGE_POSTFIX,
} from "~/constants";
import type { RootData } from "~/root";
import type { PostFormValues } from "./types";

const uppy = new Uppy({
  restrictions: {
    maxFileSize: 10000000,
    maxNumberOfFiles: 1,
    allowedFileTypes: ["image/*", ".jpg", ".jpeg", ".png", ".gif"],
  },
}).use(XHRUpload, {
  endpoint: CLOUDINARY_UPLOAD_IMAGE_URL,
  method: "POST",
  formData: true,
  fieldName: "file",
  allowedMetaFields: ["file", "folder", "upload_preset"],
});

const useUpdatePostImage = (): { uppy: Uppy } => {
  const rootLoaderData = useRouteLoaderData("root") as RootData;
  const [upload, setUpload] = useState(false);

  const { values, setValues, handleSubmit } =
    useFormikContext<PostFormValues>();

  useEffect(() => {
    if (upload) {
      handleSubmit();
    }
  }, [handleSubmit, upload]);

  const handleFileAdded = useCallback(
    async (
      file: UppyFile<Record<string, unknown>, Record<string, unknown>>
    ) => {
      const folder = `${STORE_PREFIX}/${rootLoaderData?.user?.id}/${STORE_PRODUCT_IMAGE_POSTFIX}`;
      uppy.setFileMeta(file.id, {
        folder,
        upload_preset: CLOUDINARY_PRESET,
      });
    },
    [rootLoaderData?.user?.id]
  );

  const handleUploadSuccess = useCallback(
    async (result: UploadResult<Record<string, unknown>>) => {
      const imageData: Array<{
        height: number;
        width: number;
        src: string;
      }> = [];

      for (const success of result.successful) {
        if (!success.response?.body.secure_url) return;
        if (!success.preview) return;
        imageData?.push({
          height: success.response.body.height as number,
          width: success.response.body.width as number,
          src: success.response.body.secure_url as string,
        });
      }

      setValues({
        ...values,
        imageHeight: imageData[0]?.height,
        imageWidth: imageData[0]?.width,
        imageSrc: imageData[0]?.src,
        submitState: "save",
      });
      setUpload(true);
    },
    [setValues, values]
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
export default useUpdatePostImage;
