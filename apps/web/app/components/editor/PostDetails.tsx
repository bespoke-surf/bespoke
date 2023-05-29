import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "@remix-run/react";
import { Box, Dropdown, Flex, IconButton, Link, Text } from "gestalt";
import { useCallback, useMemo, useRef, useState } from "react";
import type { RootData } from "../../root";
import type { PostByHandleData } from "../../routes/p.$postHandle/types";
import { calculateLocalTime } from "../../utils/calculateLocalTime";

export default function PostDetails() {
  const rootLoader = useRouteLoaderData("root") as RootData;
  const loaderData = useLoaderData<PostByHandleData>();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const navigate = useNavigate();

  const localTimeCal = useMemo(
    () =>
      calculateLocalTime(
        loaderData.post?.publishedDate,
        `DD MMMM YYYY ${rootLoader?.isUserSubdomain ? "hh:mm a" : ""}`
      ),
    [loaderData.post?.publishedDate, rootLoader?.isUserSubdomain]
  );

  const handleEdit = useCallback(() => {
    navigate(`/post/${loaderData.post?.id}`);
  }, [loaderData.post?.id, navigate]);

  const handleShare = useCallback(() => {
    navigate("share");
  }, [navigate]);

  return (
    <Box>
      <Flex alignItems="center" justifyContent="between" width="100%">
        <Flex direction="column" gap={2}>
          <Link href="/">
            <Text underline>{rootLoader.store?.name}</Text>
          </Link>
          <Text size="200" color="subtle">
            {localTimeCal}
          </Text>
        </Flex>
        <Flex gap={2} alignItems="center">
          <IconButton
            accessibilityLabel="share"
            icon="share"
            bgColor="lightGray"
            size="md"
            onClick={handleShare}
          />
          {rootLoader?.isUserSubdomain && (
            <IconButton
              accessibilityLabel="share"
              icon="ellipsis"
              size="md"
              bgColor="lightGray"
              ref={anchorRef}
              onClick={() => setOpen((s) => !s)}
              selected={open}
            />
          )}
        </Flex>
      </Flex>
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="sections-dropdown-example"
          onDismiss={() => setOpen(false)}
        >
          <Dropdown.Item
            onSelect={handleEdit}
            option={{ value: "edit", label: "Edit" }}
          />
        </Dropdown>
      )}
    </Box>
  );
}
