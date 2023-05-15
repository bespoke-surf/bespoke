import type { LinksFunction } from "@remix-run/node";
import coreStyle from "@uppy/core/dist/style.css";
import dashboardStyle from "@uppy/dashboard/dist/style.css";
import { DashboardModal } from "@uppy/react";
import useUpdateDisplayPicture from "./useUpdateDisplayPicture";
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

export default function UpdatePicture({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) {
  const { uppy: picturesUppy } = useUpdateDisplayPicture();

  return (
    <DashboardModal
      uppy={picturesUppy}
      closeAfterFinish
      closeModalOnClickOutside
      open={open}
      onRequestClose={close}
    />
  );
}
