import { DashboardModal } from "@uppy/react";
import useUpdatePostImage from "../../../routes/post.$postId/useUpdatePostImage";

const UploadImage = ({
  modal,
  toggleModal,
}: {
  modal: boolean;
  toggleModal: () => void;
}) => {
  const { uppy } = useUpdatePostImage();

  return (
    <DashboardModal
      uppy={uppy}
      closeModalOnClickOutside
      closeAfterFinish
      open={modal}
      onRequestClose={toggleModal}
      disablePageScrollWhenModalOpen
      proudlyDisplayPoweredByUppy={false}
    />
  );
};

export default UploadImage;
