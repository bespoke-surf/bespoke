import { useLoaderData, useRouteLoaderData } from "@remix-run/react";
import {
  Box,
  CompositeZIndex,
  Flex,
  Icon,
  IconButton,
  Image,
  Layer,
  Letterbox,
  Mask,
  Text,
  Toast,
} from "gestalt";
import { useEffect, useMemo } from "react";
import useClipboard from "react-use-clipboard";
import { ClientOnly } from "remix-utils";
import BigContainer from "../../components/BigContainer";
import { EDITOR_TOOLBAR_ZINDEX } from "../../components/Editor";
import { useTimeoutTrigger } from "../../hooks/useTimeoutTrigger";
import type { RootData } from "../../root";
import { getImageSrcAndSrcSet } from "../../utils/getCloudinarySrcAndSrcSet";
import type { PostData } from "./types";

const modalZIndex = new CompositeZIndex([EDITOR_TOOLBAR_ZINDEX]);
const toastZIndex = new CompositeZIndex([modalZIndex]);

export default function ShareAfterSubmit() {
  const loaderData = useLoaderData<PostData>();
  const rootData = useRouteLoaderData("root") as RootData;

  const [isCopied, setCopied] = useClipboard(
    `${window.location.origin}/p/${loaderData?.post?.postHandle}`,
    { successDuration: 1000 }
  );

  const { state: toast, setState: setToast } = useTimeoutTrigger(1000);

  useEffect(() => {
    if (isCopied) {
      setToast(true);
    }
  }, [isCopied, setToast]);

  const imageSrc = useMemo(
    () => getImageSrcAndSrcSet(loaderData?.post?.image?.src),
    [loaderData?.post?.image?.src]
  );

  return (
    <BigContainer>
      <Box
        position="absolute"
        top={true}
        marginTop={1}
        marginStart={2}
        left={true}
      >
        <IconButton
          accessibilityLabel="close"
          icon="cancel"
          href={`/`}
          role="link"
          target="self"
        />
      </Box>

      <Flex
        justifyContent="center"
        alignItems="center"
        direction="column"
        gap={8}
      >
        <Text align="center" weight="bold" size="600">
          Share your post
        </Text>
        <Box>
          <Icon
            accessibilityLabel="chec"
            icon="check-circle"
            color="success"
            size={50}
          />
        </Box>
      </Flex>

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
      <Flex justifyContent="center" direction="column" alignItems="center">
        <Box
          rounding={5}
          marginBottom={8}
          borderStyle="none"
          marginTop={12}
          width={400}
        >
          <Mask rounding={5} height={224} width={400} wash>
            <Letterbox
              height={224}
              width={400}
              contentAspectRatio={
                (loaderData?.post?.image?.width ?? 1) /
                (loaderData?.post?.image?.height ?? 1)
              }
            >
              <Image
                naturalHeight={loaderData?.post?.image?.height ?? 1}
                naturalWidth={loaderData?.post?.image?.width ?? 1}
                color="transparent"
                alt="post image"
                src={imageSrc?.src ?? ""}
                sizes={imageSrc?.sizes}
                srcSet={imageSrc?.srcSet}
              />
            </Letterbox>
          </Mask>
          <Box padding={2}>
            <Flex alignItems="center" gap={1}>
              <Box paddingY={2}>
                <Flex direction="column" gap={2}>
                  <Text color="subtle">
                    {rootData?.store?.subdomain}.bespoke.surf
                  </Text>

                  <Text size="300" lineClamp={1}>
                    {loaderData?.post?.title}
                  </Text>
                  <Text color="subtle" size="100" lineClamp={1}>
                    {loaderData?.post?.subTitle}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>
        <Box marginTop={8} />
        <ClientOnly>
          {() => (
            <Flex
              justifyContent="center"
              alignItems="center"
              direction="column"
              gap={4}
            >
              <Flex justifyContent="center" gap={2}>
                <IconButton
                  accessibilityLabel="copy"
                  icon="link"
                  bgColor="darkGray"
                  iconColor="white"
                  size="xl"
                  onClick={setCopied}
                />
                <IconButton
                  icon="twitter"
                  iconColor="white"
                  bgColor="darkGray"
                  size="xl"
                  accessibilityLabel="tweet"
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    `${window.location.origin}/p/${loaderData?.post?.postHandle}`
                  )}&text=${encodeURIComponent(loaderData?.post?.title ?? "")}`}
                  role="link"
                  target="blank"
                />
              </Flex>
              <Flex justifyContent="center" gap={2}>
                <IconButton
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `${loaderData?.post?.title} ${window.location.origin}/p/${loaderData?.post?.postHandle}`
                  )}`}
                  accessibilityLabel="email"
                  //@ts-ignore
                  icon="whats-app"
                  bgColor="darkGray"
                  iconColor="white"
                  role="link"
                  size="xl"
                  target="blank"
                />

                <IconButton
                  accessibilityLabel="email"
                  icon="gmail"
                  bgColor="darkGray"
                  iconColor="white"
                  size="xl"
                  href={`mailto:?subject=${encodeURIComponent(
                    `${loaderData?.post?.title}`
                  )}&body=${window.location.origin}/p/${
                    loaderData?.post?.postHandle
                  }`}
                  role="link"
                  target="self"
                />
              </Flex>
            </Flex>
          )}
        </ClientOnly>
      </Flex>
    </BigContainer>
  );
}
