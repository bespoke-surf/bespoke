import { useRouteLoaderData } from "@remix-run/react";
import {
  Badge,
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Letterbox,
  Mask,
  Text,
  Tooltip,
} from "gestalt";
import { useMemo } from "react";
import type { PostFragment } from "~/graphql/__generated__/graphql";
import { PostState } from "~/graphql/__generated__/graphql";
import { getImageSrcAndSrcSet } from "~/utils/getCloudinarySrcAndSrcSet";
import type { RootData } from "../../../../root";

export default function ListPost({ post }: { post: PostFragment }) {
  const rootData = useRouteLoaderData("root") as RootData;

  return (
    <Box marginBottom={6}>
      <Flex alignItems="start" gap={4}>
        {post?.image && (
          <Mask wash rounding={3} height={132} width={132}>
            <Letterbox
              height={132}
              width={132}
              contentAspectRatio={post.image?.width / post.image?.height}
            >
              <JustTheImage image={post.image} />
            </Letterbox>
          </Mask>
        )}
        <Flex direction="column" flex="grow" justifyContent="between" gap={2}>
          <Flex alignItems="center" gap={2}>
            {post.postViewCount > 0 && rootData?.isUserSubdomain ? (
              <Flex alignItems="center" gap={4}>
                <Flex alignItems="center" gap={1}>
                  <Text color="subtle" size="100">
                    {post.postViewCount} views
                  </Text>

                  <Tooltip text="The total number of times this post was viewed as an email and on web. Web views are not unique.">
                    <Icon
                      accessibilityLabel="info circle"
                      color="dark"
                      icon="info-circle"
                      size={12}
                    />
                  </Tooltip>
                </Flex>

                <Flex alignItems="center" gap={1}>
                  <Text color="subtle" size="100">
                    {post.postRecipientCount} recipients
                  </Text>
                  <Tooltip text="The number of unique people whom this post was received via email">
                    <Icon
                      accessibilityLabel="info circle"
                      color="dark"
                      icon="info-circle"
                      size={12}
                    />
                  </Tooltip>
                </Flex>

                <Flex alignItems="center" gap={1}>
                  <Text color="subtle" size="100">
                    {post.postOpenCount} opens
                  </Text>
                  <Tooltip text="People who opened this post after receiving this post via email">
                    <Icon
                      accessibilityLabel="info circle"
                      color="dark"
                      icon="info-circle"
                      size={12}
                    />
                  </Tooltip>
                </Flex>
              </Flex>
            ) : null}
            {post?.postState === PostState.Published ? null : (
              <Badge
                text={
                  post.postState === PostState.Draft ? "Draft" : "Unpublished"
                }
                type={
                  post.postState === PostState.Draft ? "darkWash" : "warning"
                }
              />
            )}
            <Box />
          </Flex>

          <Flex
            direction="column"
            gap={2}
            justifyContent="start"
            alignItems="start"
          >
            <Heading size="400">
              {post.title === "" ? "Untitled" : post.title ?? "Untitled"}
            </Heading>
            <Text color="subtle" size="300">
              {post.subTitle}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
const JustTheImage = ({ image }: { image: PostFragment["image"] }) => {
  const srcString = useMemo(
    () => getImageSrcAndSrcSet(image?.src, false),
    [image]
  );

  if (!srcString) return null;
  return (
    <Image
      alt="gallery image"
      color="lightGray"
      naturalHeight={image?.height ?? 1}
      naturalWidth={image?.width ?? 1}
      src={srcString?.src}
      sizes={srcString?.sizes}
      srcSet={srcString?.srcSet}
    />
  );
};

/* {post?.postState !== PostState.Draft ? (
            <Flex alignItems="center">
              <Text size="200">
                {calculateLocalTime(
                  post.publishedDate,
                  `DD MMMM YYYY ${rootLoader?.isUserSubdomain ? "hh:mm a" : ""}`
                )}
              </Text>
            </Flex>
          ) : null} */
