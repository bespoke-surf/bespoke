import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import {
  Box,
  Flex,
  Heading,
  Icon,
  Label,
  PageHeader,
  Switch,
  Text,
} from "gestalt";

import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useCallback } from "react";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import type { NotificationData } from "./types";
import { NotificationActionEnum } from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Notification - Settings | ${rootData.store?.name}`,
    description: "Notification settings",
  };
};

export async function loader({ request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  const subdomain = getSubdomain(request);
  if (!subdomain) return redirect("/");

  const response = await Promise.all([
    sdk.GetNotification(
      {
        subdomain,
      },
      { request }
    ),
  ]);

  const notification = response[0];

  return json<NotificationData>({
    notification: notification.getNotification,
  });
}

export async function action({ request }: ActionArgs) {
  const subdomain = getSubdomain(request);
  if (!subdomain) return redirect("/");

  const formData = await request.formData();

  const action = formData.get("_action") as string;

  if (action === NotificationActionEnum.newSubscriberNotificationToggle) {
    await sdk.NewSubscriberNotificationToggle(
      {
        subdomain,
      },
      {
        request,
      }
    );
  }

  return null;
}

export default function Notifications() {
  const loaderData = useLoaderData<NotificationData>();
  const fetcher = useFetcher();

  const toggled =
    fetcher.submission?.formData.get("_action") ===
    NotificationActionEnum.newSubscriberNotificationToggle;

  const handleNewSubscriberToggle = useCallback(() => {
    const formData = new FormData();
    formData.append(
      "_action",
      NotificationActionEnum.newSubscriberNotificationToggle
    );
    fetcher.submit(formData, { method: "post" });
  }, [fetcher]);

  return (
    <>
      <Flex justifyContent="start" alignItems="center" gap={2}>
        <Link to="..">
          <Text underline size="100">
            Settings
          </Text>
        </Link>
        <Icon
          accessibilityLabel="arrow-right"
          size={10}
          icon="arrow-forward"
          color="dark"
        />
        <Box color="lightWash" rounding="pill" padding={1} paddingX={2}>
          <Text size="100">Notifications</Text>
        </Box>
      </Flex>
      <PageHeader
        borderStyle="none"
        title="Notification"
        subtext="Toggle on or off your notification here"
      />
      <Flex justifyContent="center">
        <Box paddingY={6} width="92.5%">
          <Flex direction="column" gap={4}>
            <Heading size="400">Email Notifications</Heading>
            <Flex alignItems="center" justifyContent="between">
              <Label htmlFor="newOrderNotification">
                <Text>When someone subscribes to a list</Text>
              </Label>
              <Switch
                id="newOrderNotification"
                switched={
                  toggled
                    ? !loaderData.notification?.newSubscriber
                    : loaderData.notification?.newSubscriber
                }
                onChange={handleNewSubscriberToggle}
              />
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
