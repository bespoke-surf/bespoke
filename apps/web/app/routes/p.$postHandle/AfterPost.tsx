import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "@remix-run/react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Letterbox,
  Link,
  Mask,
  Text,
  WashAnimated,
} from "gestalt";
import React, { useMemo } from "react";
import type { PostFragment } from "../../graphql/__generated__/graphql";
import type { RootData } from "../../root";
import { calculateLocalTime } from "../../utils/calculateLocalTime";
import { getImageSrcAndSrcSet } from "../../utils/getCloudinarySrcAndSrcSet";
import type { PostByHandleData } from "./types";

export default function AfterPost() {
  const rootLoader = useRouteLoaderData("root") as RootData;
  const loaderData = useLoaderData<PostByHandleData>();
  const navigate = useNavigate();

  const morePosts = loaderData.morePosts?.map((post, index) => (
    <React.Fragment key={post.id}>
      <Box
        marginBottom={4}
        marginTop={4}
        display={index === 0 ? "none" : "block"}
      >
        <Divider />
      </Box>

      <ListPost post={post} />
    </React.Fragment>
  ));
  if (!loaderData.morePosts || loaderData.morePosts.length === 0) return null;
  return (
    <Box paddingX={2} marginBottom={4}>
      <ButtonGroup>
        <IconButton
          icon="share"
          size="md"
          accessibilityLabel="share"
          onClick={() => navigate("share")}
        />
        <Button
          size="md"
          href="/subscribe"
          role="link"
          text="Subscribe"
          color="gray"
        />
      </ButtonGroup>
      <Box marginTop={8} marginBottom={6}>
        <Divider />
      </Box>
      <Flex direction="column" gap={{ column: 2, row: 0 }}>
        <Flex justifyContent="between" alignItems="center">
          <Heading size="500">More from {rootLoader?.store?.name}</Heading>
          <Link href={`/`}>
            <Text underline>See all</Text>
          </Link>
        </Flex>
        <Box marginBottom={4} />
        <Flex
          alignItems="stretch"
          justifyContent="start"
          direction="column"
          // gap={4}
        >
          <Box />
          {morePosts}
        </Flex>
      </Flex>
    </Box>
  );
}

function ListPost({ post }: { post: PostFragment }) {
  const rootLoader = useRouteLoaderData("root") as RootData;
  return (
    <Link href={`/p/${post.postHandle}`} underline="none">
      <WashAnimated>
        <Box padding={2}>
          <Flex justifyContent="between" alignItems="center" gap={2}>
            <Flex
              direction="column"
              flex="grow"
              gap={3}
              justifyContent="start"
              alignItems="start"
            >
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
              <Flex alignItems="center" gap={1} wrap>
                <Text size="200">
                  {calculateLocalTime(post.publishedDate, `DD MMMM YYYY`)}
                </Text>
                <Text size="200">•</Text>
                <Link href="/">
                  <Text size="200" underline>
                    {rootLoader.store?.name}
                  </Text>
                </Link>
              </Flex>
            </Flex>
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
          </Flex>
        </Box>
      </WashAnimated>
    </Link>
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
