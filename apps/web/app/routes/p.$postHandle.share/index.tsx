import type { HeadersFunction } from "@remix-run/node";
import { useNavigate, useRouteLoaderData } from "@remix-run/react";
import {
  Box,
  CompositeZIndex,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Layer,
  Letterbox,
  Link,
  Mask,
  Modal,
  TapArea,
  Text,
  Toast,
  WashAnimated,
} from "gestalt";
import { useCallback, useEffect, useMemo } from "react";
import useClipboard from "react-use-clipboard";
import { ClientOnly } from "remix-utils";
import { EDITOR_TOOLBAR_ZINDEX } from "../../components/Editor";
import { useTimeoutTrigger } from "../../hooks/useTimeoutTrigger";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { getImageSrcAndSrcSet } from "../../utils/getCloudinarySrcAndSrcSet";
import type { PostByHandleData } from "../p.$postHandle/types";

export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const headers: HeadersFunction = ({ parentHeaders }) => {
  return {
    "cache-control": parentHeaders.get("cache-control") ?? "no-store",
  };
};

const modalZIndex = new CompositeZIndex([EDITOR_TOOLBAR_ZINDEX]);
const toastZIndex = new CompositeZIndex([modalZIndex]);

export default function Share() {
  const parentData = useRouteLoaderData(
    "routes/p.$postHandle/index"
  ) as PostByHandleData;

  const rootData = useRouteLoaderData("root") as RootData;

  const imageSrc = useMemo(
    () => getImageSrcAndSrcSet(parentData?.post?.image?.src),
    [parentData?.post?.image?.src]
  );

  const navigate = useNavigate();
  const goback = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <>
      <Layer zIndex={modalZIndex}>
        <Modal
          accessibilityModalLabel="Resume account creation"
          heading={
            <Flex justifyContent="between">
              <Heading size="500" accessibilityLevel={1}>
                Share this post
              </Heading>
              <Box
                display="none"
                smDisplay="none"
                mdDisplay="block"
                lgDisplay="block"
              >
                <IconButton
                  accessibilityLabel="Dismiss modal"
                  bgColor="white"
                  icon="cancel"
                  iconColor="darkGray"
                  onClick={goback}
                  size="sm"
                />
              </Box>
            </Flex>
          }
          align="start"
          onDismiss={goback}
          closeOnOutsideClick
          size="sm"
        >
          <Box marginBottom={8}>
            <Box rounding={3} marginBottom={8} borderStyle="sm" padding={2}>
              <Flex alignItems="center" gap={{ column: 1, row: 1 }}>
                <Mask rounding={2} height={60} width={60} wash>
                  <Letterbox
                    height={60}
                    width={60}
                    contentAspectRatio={
                      (parentData?.post?.image?.width ?? 1) /
                      (parentData?.post?.image?.height ?? 1)
                    }
                  >
                    <Image
                      naturalHeight={parentData?.post?.image?.height ?? 1}
                      naturalWidth={parentData?.post?.image?.width ?? 1}
                      color="transparent"
                      alt="post image"
                      src={imageSrc?.src ?? ""}
                      sizes={imageSrc?.sizes}
                      srcSet={imageSrc?.srcSet}
                    />
                  </Letterbox>
                </Mask>
                <Box padding={2}>
                  <Flex direction="column" gap={2}>
                    <Text size="300" lineClamp={1}>
                      {parentData?.post?.title}
                    </Text>
                    <Text color="subtle">
                      {rootData?.store?.subdomain}.bespoke.surf
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
            <ClientOnly>
              {() => (
                <Flex
                  justifyContent="between"
                  gap={{ column: 8, row: 4 }}
                  direction="row"
                  wrap
                >
                  <Link
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      `${window.location.origin}/p/${parentData?.post?.postHandle}`
                    )}&text=${encodeURIComponent(
                      parentData?.post?.title ?? ""
                    )}`}
                    target="blank"
                  >
                    <WashAnimated>
                      <Flex alignItems="center" gap={2} justifyContent="start">
                        <Icon
                          icon="twitter"
                          color="default"
                          size={15}
                          accessibilityLabel="twitter"
                        />
                        <Text>Share on Twitter</Text>
                      </Flex>
                    </WashAnimated>
                  </Link>
                  <Link
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `${parentData?.post?.title} ${window.location.origin}/p/${parentData?.post?.postHandle}`
                    )}`}
                    target="blank"
                  >
                    <WashAnimated>
                      <Flex alignItems="center" gap={2} justifyContent="start">
                        <Icon
                          //@ts-ignore
                          icon="whats-app"
                          color="default"
                          size={15}
                          accessibilityLabel="twitter"
                        />
                        <Text>Share on WhatsApp</Text>
                      </Flex>
                    </WashAnimated>
                  </Link>
                  <Link
                    href={`mailto:?subject=${encodeURIComponent(
                      `${parentData?.post?.title}`
                    )}&body=${window.location.origin}/p/${
                      parentData?.post?.postHandle
                    }`}
                  >
                    <WashAnimated>
                      <Flex alignItems="center" gap={2} justifyContent="start">
                        <Icon
                          icon="gmail"
                          color="default"
                          size={15}
                          accessibilityLabel="twitter"
                        />
                        <Text>Share via Email</Text>
                      </Flex>
                    </WashAnimated>
                  </Link>
                  <CopyLink />
                </Flex>
              )}
            </ClientOnly>
          </Box>
        </Modal>
      </Layer>
    </>
  );
}

const CopyLink = () => {
  const parentData = useRouteLoaderData(
    "routes/p.$postHandle/index"
  ) as PostByHandleData;

  const [isCopied, setCopied] = useClipboard(
    `${window.location.origin}/p/${parentData?.post?.postHandle}`,
    { successDuration: 1000 }
  );

  const { state: toast, setState: setToast } = useTimeoutTrigger(1000);

  useEffect(() => {
    if (isCopied) {
      setToast(true);
    }
  }, [isCopied, setToast]);

  return (
    <>
      {toast && (
        <Layer zIndex={toastZIndex}>
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                bottom: 50,
                left: "50%",
                transform: "translateX(-50%)",
              },
            }}
            fit
            paddingX={1}
            position="fixed"
          >
            <Toast
              text="Copied link to your clipboard to share"
              //@ts-ignore
              type="default"
            />
          </Box>
        </Layer>
      )}
      <TapArea onTap={setCopied}>
        <WashAnimated>
          <Flex alignItems="center" gap={2} justifyContent="start">
            <Icon
              icon="link"
              color="default"
              size={15}
              accessibilityLabel="twitter"
            />
            <Text>Copy link</Text>
          </Flex>
        </WashAnimated>
      </TapArea>
    </>
  );
};
