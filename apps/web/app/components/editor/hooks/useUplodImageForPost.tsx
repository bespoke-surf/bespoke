import { useRouteLoaderData } from "@remix-run/react";
import type { SuccessResponse, UppyFile } from "@uppy/core";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import type { LexicalEditor } from "lexical";
import { useCallback, useEffect, useMemo } from "react";
import { STORE_PREFIX, STORE_PRODUCT_IMAGE_POSTFIX } from "~/constants";
import type { RootData } from "~/root";

import type { InsertImagePayload } from "../plugins/ImagesPlugin";
import { INSERT_IMAGE_COMMAND } from "../plugins/ImagesPlugin";

const useUploadImageForPost = (activeEditor: LexicalEditor) => {
  const loaderData = useRouteLoaderData("root") as RootData;

  const uppy = useMemo(
    () =>
      new Uppy({
        restrictions: {
          maxFileSize: 10000000,
          maxNumberOfFiles: 1,
          allowedFileTypes: ["image/*", ".jpg", ".jpeg", ".png", ".gif"],
        },
      }).use(XHRUpload, {
        endpoint: loaderData.ENV.CLOUDINARY_UPLOAD_IMAGE_URL ?? "",
        method: "POST",
        formData: true,
        fieldName: "file",
        allowedMetaFields: ["file", "folder", "upload_preset"],
      }),
    [loaderData.ENV.CLOUDINARY_UPLOAD_IMAGE_URL]
  );

  const handleFileAdded = useCallback(
    async (
      file: UppyFile<Record<string, unknown>, Record<string, unknown>>
    ) => {
      const folder = `${STORE_PREFIX}/${loaderData?.user?.id}/${STORE_PRODUCT_IMAGE_POSTFIX}`;
      uppy.setFileMeta(file.id, {
        folder,
        upload_preset: loaderData.ENV.CLOUDINARY_PRESET,
      });
    },
    [loaderData.ENV.CLOUDINARY_PRESET, loaderData?.user?.id, uppy]
  );

  const handleFileUploaded = useCallback(
    async (
      file: UppyFile<Record<string, unknown>>,
      response: SuccessResponse
    ) => {
      if (!response.body.secure_url) return;

      const payload: InsertImagePayload = {
        altText: file.meta.name ?? "alt text missing",
        src: response.body.secure_url,
      };
      activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
    },
    [activeEditor]
  );

  useEffect(() => {
    const handler = (
      file:
        | UppyFile<Record<string, unknown>, Record<string, unknown>>
        | undefined,
      response: SuccessResponse
    ) => {
      if (file) {
        handleFileUploaded(file, response);
      }
    };
    const fileAddedhandler = (
      file: UppyFile<Record<string, unknown>, Record<string, unknown>>
    ) => {
      handleFileAdded(file);
    };

    uppy.on("upload-success", handler);
    uppy.on("file-added", fileAddedhandler);
    return () => {
      uppy.off("upload-success", handler);
      uppy.off("file-added", fileAddedhandler);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleFileAdded, handleFileUploaded]);

  return { uppy };
};
export default useUploadImageForPost;
