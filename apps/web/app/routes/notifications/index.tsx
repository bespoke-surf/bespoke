import { json, redirect } from "@remix-run/node";
import {
  Box,
  Button,
  Container,
  Divider,
  Dropdown,
  Flex,
  IconButton,
  PageHeader,
  Tabs,
  TapArea,
  Text,
} from "gestalt";
import { sdk } from "~/graphql/graphqlWrapper.server";
import { getSubdomain, isPrivateRoute } from "~/utils/utils.server";
import BigContainer from "../../components/BigContainer";
import Naviagation from "../../components/Navigation";
import type { NotificationLoaderData } from "./types";
import { NotificationActionEnum } from "./types";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import {
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { InView } from "react-intersection-observer";
import { ClientOnly, namedAction } from "remix-utils";
import type { EventFragment } from "../../graphql/__generated__/graphql";
import { calculateTimeWhile } from "../../utils/calculateTimeWhile";

export async function loader({ request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  const parsedUrl = new URL(request.url).searchParams;
  const skip = parsedUrl.get("skip") ? Number(parsedUrl.get("skip")) : 0;

  const notification = await sdk.GetNotifications(
    {
      skip,
      take: 10,
    },
    { request }
  );

  return json<NotificationLoaderData>({
    notification: notification.getNotifications,
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.clone().formData();
  const subdomain = getSubdomain(request);
  if (!subdomain) return;

  return namedAction(request, {
    async [NotificationActionEnum.dismissNotification]() {
      const eventId = formData.get("eventId") as string;
      await sdk.DismissNotification(
        {
          eventId,
        },
        {
          request,
        }
      );
      return json({
        eventId,
      });
    },
    async [NotificationActionEnum.setAllNotificationAsRead]() {
      await sdk.SetAllEventsAsRead(
        {},
        {
          request,
        }
      );
      return json(null);
    },
  });
}

export default function Notification() {
  const loaderData = useLoaderData<NotificationLoaderData>();

  const [items, setItems] = useState(loaderData.notification ?? []);
  const fetcher = useFetcher<NotificationLoaderData>();
  const submit = useSubmit();
  const actionData = useActionData<{ eventId: string }>();

  const handleMarkAsRead = useCallback(() => {
    const formData = new FormData();
    formData.append("_action", NotificationActionEnum.setAllNotificationAsRead);
    submit(formData, { method: "post" });

    const p = items?.map((data) => ({ ...data, notificationRead: true }));
    setItems(p);
  }, [submit, items]);

  useEffect(() => {
    if (
      actionData?.eventId &&
      items?.some(({ id }) => id === actionData.eventId)
    ) {
      const p = items?.filter(({ id }) => id !== actionData.eventId);
      setItems(p);
    }
  }, [actionData?.eventId, items]);

  useEffect(() => {
    if (fetcher.data) {
      setItems((prevData) => [
        ...(prevData ?? []),
        ...(fetcher.data?.notification ?? []),
      ]);
    }
  }, [fetcher.data]);

  const handleFetchMore = useCallback(
    (inView: boolean) => {
      console.log(inView, items?.length);
      if (!inView) return;
      fetcher.load(`/notifications?skip=${items?.length}`);
    },
    [fetcher, items?.length]
  );

  const notifications = useMemo(
    () =>
      items?.map((data, index) => (
        <React.Fragment key={data.id}>
          <ClientOnly>
            {() => (
              <>
                <Noti
                  //@ts-ignore
                  event={data}
                />
                {index === items?.length - 5 && (
                  <InView onChange={handleFetchMore} />
                )}
              </>
            )}
          </ClientOnly>
        </React.Fragment>
      )),
    [handleFetchMore, items]
  );

  return (
    <BigContainer>
      <Flex alignItems="start">
        <Naviagation />
        <Flex.Item flex="grow">
          <Container>
            <PageHeader
              borderStyle="none"
              title="NOTIFICATIONS"
              primaryAction={{
                component: (
                  <Button
                    text="Mark as read"
                    color="gray"
                    onClick={handleMarkAsRead}
                    size="lg"
                  />
                ),
                dropdownItems: [
                  <Dropdown.Item
                    onSelect={handleMarkAsRead}
                    option={{ label: "Mark as read", value: "mark" }}
                    key="mark-as-read"
                  />,
                ],
              }}
            />
            <Flex justifyContent="center">
              <Box width="91.5%" paddingY={6}>
                <Flex justifyContent="between">
                  <Tabs
                    activeTabIndex={0}
                    onChange={() => undefined}
                    tabs={[{ text: "Activity", href: "/notifications" }]}
                  />
                </Flex>
                <Box marginBottom={6} />

                <Flex direction="column">
                  {notifications}
                  <Box />
                </Flex>
              </Box>
            </Flex>
          </Container>
        </Flex.Item>
      </Flex>
    </BigContainer>
  );
}

const Noti = ({ event }: { event: EventFragment }) => {
  const [open, toggleOpen] = useReducer((s) => !s, false);
  const anchorRef = useRef(null);
  const submit = useSubmit();
  const navigation = useNavigation();

  const isDismissed =
    navigation.formData?.get("_action") ===
      NotificationActionEnum.dismissNotification &&
    navigation.formData.get("eventId") === event.id;

  const handleDismiss = useCallback(() => {
    const formData = new FormData();
    formData.append("eventId", event.id);
    formData.append("_action", NotificationActionEnum.dismissNotification);
    toggleOpen();
    submit(formData, { method: "post" });
  }, [event.id, submit]);

  if (isDismissed) return null;

  return (
    <>
      <Box
        marginTop={5}
        display="flex"
        justifyContent="between"
        alignItems="center"
        key={event.id}
        rounding={4}
        marginBottom={6}
      >
        <TapArea
        // onTap={() => navigate(`${event.link}`)}
        // disabled={event.link ? false : true}
        >
          <Flex gap={1} direction="column">
            <Flex alignItems="center" justifyContent="between">
              <Text>{event.message}</Text>
            </Flex>
            <Flex gap={1}>
              <Text color="subtle">{calculateTimeWhile(event.createdAt)}</Text>
            </Flex>
          </Flex>
        </TapArea>
        <Flex gap={1} alignItems="center">
          <IconButton
            accessibilityLabel="ellipsis"
            icon="ellipsis"
            size="sm"
            bgColor="lightGray"
            ref={anchorRef}
            onClick={toggleOpen}
            selected={open}
          />
          <Box
            display={event.notificationRead ? "none" : "flex"}
            justifyContent="center"
          >
            <Box color="errorBase" padding={1} rounding="circle" />
          </Box>
        </Flex>
      </Box>
      <Divider />
      {open && (
        <Dropdown
          anchor={anchorRef.current}
          id="header-dropdown-example"
          onDismiss={toggleOpen}
        >
          <Dropdown.Item
            onSelect={handleDismiss}
            option={{ value: "Dissmiss", label: "Dissmiss" }}
          />
        </Dropdown>
      )}
    </>
  );
};
