import { useRouteLoaderData, useSubmit } from "@remix-run/react";
import type { UploadResult, UppyFile } from "@uppy/core";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { useCallback, useEffect, useMemo } from "react";
import { STORE_DISPLAY_PICTURE_POSTFIX, STORE_PREFIX } from "~/constants";
import type { RootData } from "~/root";
import { SettingsBuisnessProfileActionEnum } from "../types";

const useUpdateDisplayPicture = (): { uppy: Uppy } => {
  const storeData = useRouteLoaderData("root") as RootData;
  const submit = useSubmit();

  const uppy = useMemo(
    () =>
      new Uppy({
        restrictions: {
          maxFileSize: 10000000,
          maxNumberOfFiles: 1,
          allowedFileTypes: ["image/*", ".jpg", ".jpeg", ".png", ".gif"],
        },
      }).use(XHRUpload, {
        endpoint: storeData.CLOUDINARY_UPLOAD_IMAGE_URL as string,
        method: "POST",
        formData: true,
        fieldName: "file",
        allowedMetaFields: ["file", "folder", "upload_preset"],
      }),
    [storeData.CLOUDINARY_UPLOAD_IMAGE_URL]
  );

  const handleFileAdded = useCallback(
    async (
      file: UppyFile<Record<string, unknown>, Record<string, unknown>>
    ) => {
      const folder = `${STORE_PREFIX}/${storeData?.store?.id}/${STORE_DISPLAY_PICTURE_POSTFIX}`;
      uppy.setFileMeta(file.id, {
        folder,
        upload_preset: storeData.CLOUDINARY_PRESET,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [storeData.CLOUDINARY_PRESET, storeData?.store?.id]
  );

  const handleUploadSuccess = useCallback(
    async (result: UploadResult<Record<string, unknown>>) => {
      if (!storeData?.store?.id) return;
      const formData = new FormData();
      formData.append(
        "_action",
        SettingsBuisnessProfileActionEnum.updateDisplayPicture
      );

      // only 1 pic is added so it's fine forlooping
      for (const success of result.successful) {
        if (!success.response?.body.secure_url) return;
        if (!success.preview) return;
        formData.append("height", String(success.response.body.height));
        formData.append("width", String(success.response.body.width));
        formData.append("url", String(success.response.body.secure_url));
      }

      formData.append("storeId", storeData?.store?.id);
      submit(formData, { method: "post", replace: true });
    },
    [storeData?.store?.id, submit]
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
export default useUpdateDisplayPicture;
