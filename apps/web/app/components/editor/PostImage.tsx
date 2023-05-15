import { useRouteLoaderData } from "@remix-run/react";
import { useFormikContext } from "formik";
import {
  Box,
  FixedZIndex,
  Flex,
  Icon,
  IconButton,
  Image,
  Mask,
  SlimBanner,
  Tooltip,
} from "gestalt";
import { lazy, Suspense, useMemo, useReducer } from "react";
import type { RootData } from "~/root";
import { getImageSrcAndSrcSet } from "~/utils/getCloudinarySrcAndSrcSet";
import type { EditorFormikValues } from "../Editor";

const UploadImage = lazy(() => import("./postImage/UploadImage"));

export const replaceIconZIndex = new FixedZIndex(10);

export default function PostImage({
  disableEdit = true,
}: {
  disableEdit: boolean;
}) {
  const rootLoaderData = useRouteLoaderData("root") as RootData;

  const [modal, toggleModal] = useReducer((s) => !s, false);

  const { values, touched, errors } = useFormikContext<EditorFormikValues>();

  const srcString = useMemo(
    () => getImageSrcAndSrcSet(values.imageSrc, false),
    [values.imageSrc]
  );

  return (
    <>
      <Box
        justifyContent="start"
        alignItems="center"
        display={srcString ? "none" : "flex"}
      >
        <Flex gap={1} alignItems="center">
          <IconButton
            icon="add"
            bgColor="lightGray"
            size="lg"
            accessibilityLabel="add"
            onClick={toggleModal}
          />
          <Tooltip
            text="Upload your post header image."
            zIndex={replaceIconZIndex}
          >
            <Icon
              accessibilityLabel="info circle"
              color="dark"
              icon="info-circle"
              size={12}
            />
          </Tooltip>
        </Flex>
      </Box>
      {touched.imageSrc && errors.imageSrc ? (
        <Box padding={2}>
          <SlimBanner
            message={errors.imageSrc}
            iconAccessibilityLabel="error"
            type="error"
          />
        </Box>
      ) : (
        <></>
      )}
      {srcString ? (
        <Box
          display="flex"
          direction="row"
          justifyContent="center"
          alignItems="center"
          paddingX={2}
          marginBottom={2}
          marginTop={4}
          width="100%"
        >
          <Box position="relative" width="100%">
            {!disableEdit && (
              <Box
                zIndex={replaceIconZIndex}
                width="100%"
                position="absolute"
                padding={2}
                display={rootLoaderData?.isUserSubdomain ? "block" : "none"}
              >
                <Flex width="100%" justifyContent="end">
                  <IconButton
                    accessibilityLabel="update display picture"
                    icon="replace"
                    iconColor="darkGray"
                    bgColor="lightGray"
                    onClick={toggleModal}
                    selected={modal}
                  />
                </Flex>
              </Box>
            )}
            <Flex alignItems="stretch" justifyContent="center">
              <Mask
                width={
                  values?.imageWidth && values.imageWidth > 800
                    ? 800
                    : values.imageWidth
                }
                height="auto"
              >
                <ImageComponent srcString={srcString} />
              </Mask>
            </Flex>
          </Box>
        </Box>
      ) : null}

      {!disableEdit && (
        <Suspense fallback={null}>
          <UploadImage modal={modal} toggleModal={toggleModal} />
        </Suspense>
      )}
    </>
  );
}

const ImageComponent = ({
  srcString,
}: {
  srcString: ReturnType<typeof getImageSrcAndSrcSet>;
}) => {
  const { values } = useFormikContext<{
    imageSrc: string | undefined;
    imageHeight: number;
    imageWidth: number;
    title: string;
  }>();

  if (!srcString) return null;

  return (
    <Image
      src={srcString.src}
      srcSet={srcString.srcSet}
      sizes={srcString.sizes}
      alt="display pciture"
      naturalHeight={values.imageHeight ?? 1}
      naturalWidth={values.imageWidth ?? 1}
      color="transparent"
    />
  );
};
