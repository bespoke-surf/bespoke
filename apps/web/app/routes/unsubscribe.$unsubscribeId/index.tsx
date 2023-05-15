import {
  Box,
  Button,
  Dropdown,
  Flex,
  Heading,
  PageHeader,
  SlimBanner,
  Table,
  Text,
} from "gestalt";

import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useCallback, useMemo } from "react";
import BigContainer from "../../components/BigContainer";
import { sdk } from "../../graphql/graphqlWrapper.server";
import {
  EmailConcentState,
  SubscriberEmailStatus,
} from "../../graphql/__generated__/graphql";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import type { UnsubscriberData } from "./types";
import { UnsubscribeActionEnum } from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Unsubscribe | ${rootData.store?.name}`,
    description: "Tools for growth and to increase revenue",
  };
};

export async function loader({ request, params }: LoaderArgs) {
  const unsubscribeId = params.unsubscribeId as string;
  if (!unsubscribeId) return redirect("/");

  const subLists = await sdk.GetAllListsOfASubscriber(
    {
      unsubscriberId: unsubscribeId,
    },
    { request }
  );

  return json<UnsubscriberData>({
    subscriberList: subLists.getAllListsOfASubscriber,
  });
}

export async function action({ params, request }: ActionArgs) {
  const unsubscribeId = params.unsubscribeId as string;

  const formData = await request.formData();

  const action = formData.get("_action") as string;

  if (action === UnsubscribeActionEnum.unsubscribeFromList) {
    const listId = formData.get("listId") as string;
    await sdk.UnsubscribeFromList(
      {
        unsubscribeId: unsubscribeId,
        listId,
      },
      { request }
    );
  }

  if (action === UnsubscribeActionEnum.resubscribeToLIst) {
    const listId = formData.get("listId") as string;
    await sdk.ResubscribeToList(
      {
        unsubscribeId: unsubscribeId,
        listId,
      },
      { request }
    );
  }

  if (action === UnsubscribeActionEnum.unsubscribeFromAllLIst) {
    await sdk.UnsubscribeFromAllList(
      {
        unsubscribeId,
      },
      { request }
    );
  }

  return null;
}

export default function Unsubscribe() {
  const loaderData = useLoaderData<UnsubscriberData>();
  const fetcher = useFetcher();

  const list = useMemo(
    () =>
      loaderData.subscriberList?.map((value) => (
        <List
          subscriberList={
            value as NonNullable<UnsubscriberData["subscriberList"]>[0]
          }
          key={value.id}
        />
      )),
    [loaderData.subscriberList]
  );

  const unsubscribed =
    fetcher.submission?.formData.get("_action") ===
      UnsubscribeActionEnum.unsubscribeFromAllLIst &&
    loaderData.subscriberList?.[0]?.subscriber.emailStatus ===
      SubscriberEmailStatus.Subscribed;
  const subscribed =
    fetcher.submission?.formData.get("_action") ===
      UnsubscribeActionEnum.unsubscribeFromAllLIst &&
    loaderData.subscriberList?.[0]?.subscriber.emailStatus ===
      SubscriberEmailStatus.Unsubscribed;

  const handleAllUnsubscribe = useCallback(() => {
    const formData = new FormData();
    formData.append("_action", UnsubscribeActionEnum.unsubscribeFromAllLIst);
    fetcher.submit(formData, { method: "post" });
  }, [fetcher]);

  return (
    <BigContainer>
      <PageHeader
        title={
          loaderData.subscriberList?.[0]?.subscriber?.user?.email ??
          "Subscription Information"
        }
        subtext="Details and information about your subscription."
        primaryAction={{
          component: (
            <Button
              onClick={handleAllUnsubscribe}
              text={
                subscribed
                  ? "Global Subscribe"
                  : unsubscribed
                  ? "Global Unsubscribe"
                  : loaderData.subscriberList?.[0]?.subscriber.emailStatus ===
                    SubscriberEmailStatus.Subscribed
                  ? "Global Unsubscribe"
                  : "Global Subscribe"
              }
              color={
                subscribed
                  ? "red"
                  : unsubscribed
                  ? "gray"
                  : loaderData.subscriberList?.[0]?.subscriber.emailStatus ===
                    SubscriberEmailStatus.Subscribed
                  ? "gray"
                  : "red"
              }
              size="lg"
            />
          ),
          dropdownItems: [
            <Dropdown.Item
              key="turnoffall"
              option={{
                value: "turn-off-all",
                label: subscribed
                  ? "Global Subscribe"
                  : unsubscribed
                  ? "Global Unsubscribe"
                  : loaderData.subscriberList?.[0]?.subscriber.emailStatus ===
                    SubscriberEmailStatus.Subscribed
                  ? "Global Unsubscribe"
                  : "Global Subscribe",
              }}
              onSelect={handleAllUnsubscribe}
            />,
          ],
        }}
        borderStyle="none"
      />
      <Flex justifyContent="center">
        <Box width="90%" paddingY={6}>
          <Flex gap={{ column: 8, row: 0 }} direction="column">
            <Flex direction="column" gap={2}>
              <Heading size="400">Update Subscription</Heading>
              <Text>
                Turn off based on subscription lists you have been added to
              </Text>
              <Box marginTop={2}>
                <SlimBanner
                  message="You have the option to 'Unsubscribe All' to unsubscribe from both non-list based subscriptions and all lists."
                  type="infoBare"
                  iconAccessibilityLabel="info"
                />
              </Box>
            </Flex>
            <Flex gap={{ column: 3, row: 0 }} direction="column">
              {list?.length !== undefined && list?.length > 0 ? (
                <Table accessibilityLabel="list talbe">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        <Box />
                      </Table.HeaderCell>
                      {["List", "Options"].map((title, idx) => {
                        return (
                          <Table.HeaderCell key={idx}>
                            <Text
                              align={title === "Options" ? "end" : "start"}
                              weight="bold"
                            >
                              {title}
                            </Text>
                          </Table.HeaderCell>
                        );
                      })}
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>{list}</Table.Body>
                </Table>
              ) : (
                <Text color="subtle">Not added to any lists</Text>
              )}
              <Box />
            </Flex>
          </Flex>
          <Box></Box>
        </Box>
      </Flex>
    </BigContainer>
  );
}

const List = ({
  subscriberList,
}: {
  subscriberList: NonNullable<UnsubscriberData["subscriberList"]>[0];
}) => {
  const fetcher = useFetcher();

  const unsubscribed =
    fetcher.submission?.formData.get("_action") ===
    UnsubscribeActionEnum.unsubscribeFromList;
  const resubscribe =
    fetcher.submission?.formData.get("_action") ===
    UnsubscribeActionEnum.resubscribeToLIst;

  const unsubscribedState =
    subscriberList.emailConcent.state === EmailConcentState.Unsubscribed
      ? true
      : false;

  const handleOnClick = useCallback(() => {
    const formData = new FormData();
    formData.append("listId", subscriberList.listId);

    if (unsubscribedState) {
      formData.append("_action", UnsubscribeActionEnum.resubscribeToLIst);
    } else {
      formData.append("_action", UnsubscribeActionEnum.unsubscribeFromList);
    }

    fetcher.submit(formData, { method: "post" });
  }, [fetcher, subscriberList.listId, unsubscribedState]);

  return (
    <Table.Row>
      <Table.Cell>
        <Box />
      </Table.Cell>
      <Table.Cell>
        <Text size="300">{subscriberList.list.name}</Text>
      </Table.Cell>
      <Table.Cell>
        <Flex justifyContent="end">
          <Button
            text={
              unsubscribed
                ? "Subscribe"
                : resubscribe
                ? "Unsbuscribe"
                : unsubscribedState
                ? "Subscribe"
                : "Unsbuscribe"
            }
            color={
              unsubscribed
                ? "red"
                : resubscribe
                ? "gray"
                : unsubscribedState
                ? "red"
                : "gray"
            }
            onClick={handleOnClick}
          />
        </Flex>
      </Table.Cell>
    </Table.Row>
  );
};
