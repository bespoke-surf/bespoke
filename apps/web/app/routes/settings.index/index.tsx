import type { LoaderArgs } from "@remix-run/node";
import { Link, useSubmit } from "@remix-run/react";
import {
  Box,
  Button,
  Dropdown,
  Flex,
  Heading,
  Icon,
  PageHeader,
} from "gestalt";
import posthog from "posthog-js";
import { useCallback } from "react";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { isPrivateRoute } from "../../utils/utils.server";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export async function loader({ request }: LoaderArgs) {
  await isPrivateRoute(request);

  return null;
}

export default function SettingIndex() {
  const submit = useSubmit();
  const handleLogout = useCallback(() => {
    submit(null, {
      action: "/logout?index",
      method: "post",
    });
    posthog.reset();
  }, [submit]);
  return (
    <>
      <PageHeader
        borderStyle="none"
        title="Settings"
        primaryAction={{
          component: (
            <Button
              text="Logout"
              onClick={handleLogout}
              size="lg"
              color="gray"
            />
          ),
          dropdownItems: [
            <Dropdown.Item
              onSelect={handleLogout}
              option={{ label: "Logout", value: "logout" }}
              key="logout"
            />,
          ],
        }}
      />
      <Flex justifyContent="center">
        <Box paddingY={6} width="91.5%">
          <Flex direction="column" gap={{ column: 8, row: 0 }}>
            <Link to="business-profile" prefetch="intent">
              <Flex justifyContent="between" alignItems="center">
                <Heading size="400">Business Profile</Heading>
                <Icon
                  accessibilityLabel="arrow forward"
                  icon="arrow-forward"
                  size={15}
                  color="dark"
                />
              </Flex>
            </Link>
            <Link to="p-s" prefetch="intent">
              <Flex justifyContent="between" alignItems="center">
                <Heading size="400">Posts & Subscribers</Heading>
                <Icon
                  accessibilityLabel="arrow forward"
                  icon="arrow-forward"
                  size={15}
                  color="dark"
                />
              </Flex>
            </Link>

            <Link to="product" prefetch="intent">
              <Flex justifyContent="between" alignItems="center">
                <Heading size="400">Product Settings</Heading>
                <Icon
                  accessibilityLabel="arrow forward"
                  icon="arrow-forward"
                  size={15}
                  color="dark"
                />
              </Flex>
            </Link>
            <Link to="notifications" prefetch="intent">
              <Flex justifyContent="between" alignItems="center">
                <Heading size="400">Notifications</Heading>
                <Icon
                  accessibilityLabel="arrow forward"
                  icon="arrow-forward"
                  size={15}
                  color="dark"
                />
              </Flex>
            </Link>
            <Link to="api-keys" prefetch="intent">
              <Flex justifyContent="between" alignItems="center">
                <Heading size="400">API Keys</Heading>
                <Icon
                  accessibilityLabel="arrow forward"
                  icon="arrow-forward"
                  size={15}
                  color="dark"
                />
              </Flex>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
