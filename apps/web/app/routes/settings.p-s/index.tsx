import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Link,
  useFetcher,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "@remix-run/react";
import type { ComboBoxItemType } from "gestalt";
import { Box, ComboBox, Flex, Icon, PageHeader, Text } from "gestalt";
import { useEffect, useState } from "react";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import type { ListData } from "../subscriber-lists/types";
import { SettingsActionEnum } from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Posts & Subscribers - Settings | ${rootData.store?.name}`,
    description: "Settings related posts and subscribers.",
  };
};

export async function loader({ request }: LoaderArgs) {
  await isPrivateRoute(request);

  const subdomain = getSubdomain(request);

  if (!subdomain) return redirect("/");

  const response = await Promise.all([
    sdk.GetLists(
      {
        subdomain,
      },
      {
        request,
      }
    ),
  ]);

  const lists = response[0];

  return json({
    lists: lists.getLists,
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const action = formData.get("_action") as string;

  if (action === SettingsActionEnum.updateDefaultListIdToCollectEmail) {
    const listId = formData.get("listId") as string;
    const storeId = formData.get("storeId") as string;
    await sdk.UpdateDefaultListIdToCollectEmail(
      {
        listId,
        storeId,
      },
      { request }
    );
  }

  return null;
}

// const base = [
//   {
//     label: "Create a new list",
//     value: "create-list",
//     subtext: "navigates to Lists",
//   },
// ];

export default function Subscriptions() {
  const loaderData = useLoaderData<typeof loader>();
  const [options] = useState(
    () =>
      loaderData.lists?.map((list) => ({ label: list.name, value: list.id }))
    // .concat(base) ??[ ]
  );
  const rootData = useRouteLoaderData("root") as RootData;
  const [selected, setSelected] = useState<ComboBoxItemType>();
  const navigate = useNavigate();
  const fetcher = useFetcher<ListData>();

  useEffect(() => {
    if (rootData?.store?.defaultListIdToCollectEmail && options) {
      const option = options.find(
        ({ value }) => value === rootData.store?.defaultListIdToCollectEmail
      );
      if (option) {
        setSelected({
          label: option?.label,
          value: rootData.store.defaultListIdToCollectEmail,
        });
      }
    }
  }, [options, rootData?.store?.defaultListIdToCollectEmail]);

  const handleSelect = ({ item }: { item: ComboBoxItemType }) => {
    if (!rootData?.store?.id) return;
    setSelected(item);
    if (item.value === "create-list") {
      navigate("/subscriber-lists/create-list");
    } else {
      const formData = new FormData();
      formData.append(
        "_action",
        SettingsActionEnum.updateDefaultListIdToCollectEmail
      );
      formData.append("listId", item.value);
      formData.append("storeId", rootData?.store?.id);
      fetcher.submit(formData, { method: "post" });
    }
  };

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
          <Text size="100">Posts & Subscribers</Text>
        </Box>
      </Flex>
      <PageHeader
        borderStyle="none"
        title="Posts & Subscribers"
        subtext="Settings related posts and subscribers."
      />
      <Flex justifyContent="center">
        <Box width="91.5%" paddingY={6}>
          <Flex direction="column" gap={6}>
            <Flex direction="column" gap={2}>
              <Text weight="bold" size="400">
                Subscriptions
              </Text>
              <Text inline>
                Subscribe contacts who opt-in via the Subscribe Button, such as
                during, reading a post{" "}
                <Text inline color="subtle">
                  (tapping the subscribe button with or without caption)
                </Text>{" "}
                or tapping the subscribe button on the navigation bar.
              </Text>
            </Flex>

            <Flex justifyContent="between" alignItems="center">
              <Flex direction="column" gap={2}>
                <Text weight="bold">Collect Subscribers </Text>
                <ComboBox
                  size="lg"
                  accessibilityClearButtonLabel="Clear the current value"
                  label="Select a list"
                  id="subtext"
                  noResultText="No results found"
                  inputValue={selected?.label}
                  options={options}
                  selectedOption={selected}
                  placeholder="Select a list"
                  onSelect={handleSelect}
                  errorMessage={
                    !rootData?.store?.defaultListIdToCollectEmail
                      ? "please select a list"
                      : undefined
                  }
                />
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
