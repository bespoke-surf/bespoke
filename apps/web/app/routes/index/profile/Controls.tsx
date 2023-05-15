import { useRouteLoaderData } from "@remix-run/react";
import { Box, Button, Flex, IconButton } from "gestalt";
import type { RootData } from "~/root";

export default function Controls() {
  const rootLoader = useRouteLoaderData("root") as RootData;

  return (
    <Box paddingX={2} marginTop={2}>
      <Flex justifyContent="between">
        <Flex.Item flex="grow">
          <Box />
        </Flex.Item>
        {!rootLoader?.isUserSubdomain ? (
          <Button text="Subscribe" color="red" />
        ) : null}
        <IconButton
          icon="menu"
          accessibilityLabel="menu"
          iconColor="darkGray"
        />
      </Flex>
    </Box>
  );
}
