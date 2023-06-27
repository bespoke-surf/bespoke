import { useFetcher, useRouteLoaderData } from "@remix-run/react";
import { Avatar, Box, Dropdown, Flex, Text } from "gestalt";
import posthog from "posthog-js";
import { useCallback } from "react";
import type { RootData } from "../../../root";
export default function UserMenu({
  close,
  anchorRef,
}: {
  close: () => void;
  anchorRef: React.MutableRefObject<null>;
}) {
  const fetcher = useFetcher();

  const handleLogout = useCallback(() => {
    fetcher.submit(null, {
      action: "logout",
      method: "post",
    });
    posthog.reset();
    close();
  }, [close, fetcher]);

  const rootLoaderData = useRouteLoaderData("root") as RootData;

  return (
    <Dropdown
      anchor={anchorRef.current}
      id="header-dropdown-example"
      onDismiss={close}
      zIndex={{ index: () => 9999999999 }}
      headerContent={
        <Box width="100%">
          <Flex gap={2} alignItems="center">
            <Avatar name={rootLoaderData.user?.name ?? ""} size="md" />
            <Flex direction="column">
              <Text weight="bold" lineClamp={10}>
                {rootLoaderData.user?.name}
              </Text>
              <Text size="200" color="subtle">
                {rootLoaderData.user?.email}
              </Text>
            </Flex>
          </Flex>
        </Box>
      }
    >
      <Dropdown.Section label="Business">
        <Dropdown.Link
          href="/integrations"
          option={{ value: "item 1", label: "Integrations" }}
        />
        {/* <Dropdown.Link
          href="/challenges"
          option={{ value: "item 1", label: "Periodic Reports" }}
        /> */}
      </Dropdown.Section>
      <Dropdown.Section label="Account">
        <Dropdown.Link
          href="/growth-path"
          option={{ value: "item 1", label: "Plan" }}
        />
        <Dropdown.Link
          href="/settings"
          option={{ value: "item 1", label: "Settings" }}
        />
      </Dropdown.Section>

      <Dropdown.Section label="More Options">
        <Dropdown.Item
          onSelect={handleLogout}
          option={{ value: "item 1", label: "Log out" }}
        />
      </Dropdown.Section>
    </Dropdown>
  );
}
