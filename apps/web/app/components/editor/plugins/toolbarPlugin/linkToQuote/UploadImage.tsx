import type { LinksFunction } from "@remix-run/node";
import coreStyle from "@uppy/core/dist/style.css";
import dashboardStyle from "@uppy/dashboard/dist/style.css";
import { DashboardModal } from "@uppy/react";
import type { LexicalEditor } from "lexical";
import useUploadImageForPost from "../../../hooks/useUplodImageForPost";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: coreStyle,
    },
    {
      rel: "stylesheet",
      href: dashboardStyle,
    },
  ];
};

export default function UploadImage({
  editor,
  open,
  close,
}: {
  editor: LexicalEditor;
  open: boolean;
  close: () => void;
}) {
  const { uppy: imageUploadUppy } = useUploadImageForPost(editor);
  return (
    <DashboardModal
      uppy={imageUploadUppy}
      closeModalOnClickOutside
      closeAfterFinish
      open={open}
      onRequestClose={close}
    />
  );
}
