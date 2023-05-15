import { useRouteLoaderData } from "@remix-run/react";
import { Box, Button, Flex, Heading } from "gestalt";
import type { RootData } from "../../root";

export default function Subscribe() {
  const rootLoader = useRouteLoaderData("root") as RootData;
  return (
    <Box paddingX={2} marginTop={12} marginBottom={12}>
      <Box rounding={4} paddingY={12}>
        <Flex direction="column" gap={8}>
          <Heading color="dark" align="center" size="500">
            Subscriber to {rootLoader?.store?.name}
          </Heading>
          <Box paddingX={2}>
            <Flex justifyContent="center" gap={2} alignItems="center">
              <Button
                text="Subscribe"
                color="gray"
                size="lg"
                href="/subscribe"
                role="link"
                type="button"
                target="self"
              />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
