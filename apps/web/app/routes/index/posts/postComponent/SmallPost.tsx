import type { LinkProps } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { Box, Flex, Heading, Image, Letterbox, Mask, Text } from "gestalt";
import { useMemo } from "react";
import type { PostFragment } from "~/graphql/__generated__/graphql";
import { getImageSrcAndSrcSet } from "~/utils/getCloudinarySrcAndSrcSet";

export default function SmallPost({
  post,
  navigationLink,
}: {
  post: PostFragment;
  navigationLink: LinkProps["to"];
}) {
  const srcString = useMemo(
    () => getImageSrcAndSrcSet(post.image?.src, false),
    [post.image]
  );

  return (
    <Flex alignItems="stretch" justifyContent="center">
      <Link to={navigationLink}>
        <Box position="relative" height={258} maxWidth={344} width="100%">
          <Box
            position="absolute"
            rounding={8}
            zIndex={{ index: () => 10 }}
            height="100%"
            width="100%"
            dangerouslySetInlineStyle={{
              __style: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
            }}
          >
            <Box
              paddingX={4}
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
              display="flex"
              direction="column"
            >
              <Heading align="center" color="light" size="300">
                {post.title === "" ? "Untitled" : post.title ?? "Untitled"}
              </Heading>
              <Box marginTop={2}>
                <Text color="light" size="100" align="center">
                  {post.subTitle}
                </Text>
              </Box>
            </Box>
          </Box>
          <Link to={navigationLink}>
            <Mask wash rounding={8}>
              <Letterbox
                height={258}
                width={344}
                contentAspectRatio={
                  post.image?.width ? post.image?.width / post.image?.height : 1
                }
              >
                <Image
                  alt="gallery image"
                  color="lightGray"
                  naturalHeight={post.image?.height ?? 1}
                  naturalWidth={post.image?.width ?? 1}
                  src={srcString?.src ?? ""}
                  sizes={srcString?.sizes ?? ""}
                  srcSet={srcString?.srcSet ?? ""}
                />
              </Letterbox>
            </Mask>
          </Link>
        </Box>
      </Link>
    </Flex>
  );
}
