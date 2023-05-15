import type { LinkProps } from "@remix-run/react";
import { Link, useRouteLoaderData } from "@remix-run/react";
import {
  Badge,
  Box,
  Flex,
  Heading,
  Image,
  Letterbox,
  Mask,
  Text,
} from "gestalt";
import { useMemo } from "react";
import type { PostFragment } from "~/graphql/__generated__/graphql";
import { PostState } from "~/graphql/__generated__/graphql";
import type { RootData } from "~/root";
import { getImageSrcAndSrcSet } from "~/utils/getCloudinarySrcAndSrcSet";
import { calculateLocalTime } from "../../../../utils/calculateLocalTime";

export default function LargePost({
  post,
  navigationLink,
}: {
  navigationLink: LinkProps["to"];
  post: PostFragment;
}) {
  const rootLoader = useRouteLoaderData("root") as RootData;
  return (
    <Box borderStyle="shadow" rounding={8} marginBottom={6} overflow="hidden">
      <Flex>
        <Box
          position="relative"
          dangerouslySetInlineStyle={{ __style: { borderRadisu: 0 } }}
        >
          <Mask wash>
            <Letterbox
              height={424}
              width={278}
              contentAspectRatio={
                (post?.image?.width ?? 1) / (post?.image?.height ?? 1)
              }
            >
              <Link to={navigationLink} prefetch="intent">
                <JustTheImage image={post.image} />
              </Link>
            </Letterbox>
          </Mask>
        </Box>
        <Box padding={5}>
          <Flex
            height="100%"
            direction="column"
            justifyContent="center"
            alignItems="start"
            gap={4}
          >
            {post?.postState === PostState.Published ? (
              <Text size="200">
                {calculateLocalTime(
                  post.publishedDate,
                  `DD MMMM YYYY ${rootLoader?.isUserSubdomain ? "hh:mm a" : ""}`
                )}
              </Text>
            ) : (
              <Badge
                text={
                  post.postState === PostState.Draft ? "Draft" : "Unpublished"
                }
                type={
                  post.postState === PostState.Draft ? "darkWash" : "warning"
                }
              />
            )}
            <Link to={navigationLink} prefetch="intent">
              <Heading size="600">
                {post.title === "" ? "Untitled" : post.title ?? "Untitled"}
              </Heading>
            </Link>
            <Text size="500">{post.subTitle}</Text>
          </Flex>
        </Box>
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
