import {
  Link,
  useActionData,
  useFetcher,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
import {
  Box,
  Button,
  Callout,
  Dropdown,
  Flex,
  Heading,
  Icon,
  PageHeader,
  Table,
  TapArea,
  Text,
} from "gestalt";

import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import { useCallback, useEffect, useReducer } from "react";
import { namedAction } from "remix-utils";
import type { ApiKeyFragment } from "../../graphql/__generated__/graphql";
import { ApiAccessLevel } from "../../graphql/__generated__/graphql";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import CreateApiKey from "./CreateApiKey";
import type { ApiKeysData } from "./types";
import { ApiKeyActionEnum } from "./types";
dayjs.extend(LocalizedFormat);
dayjs.extend(utc);
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `API Keys - Settings | ${rootData.store?.name}`,
    description: "API Keys",
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
    sdk.GetApiKeys(
      {
        subdomain,
      },
      { request }
    ),
  ]);

  return json({
    apiKeys: response[0].getApiKeys,
  });
}

export async function action({ request }: ActionArgs) {
  return namedAction(request, {
    async [ApiKeyActionEnum.creatApiKey]() {
      const formData = await request.clone().formData();
      const storeId = formData.get("storeId") as string;
      const name = formData.get("name") as string;
      const scopes = formData.get("scopes") as string;
      const accessLevel = formData.get("accessLevel") as ApiAccessLevel;
      const pareseScope = JSON.parse(scopes);
      console.log({ scopes, pareseScope });
      await sdk.CreateApiKey(
        {
          accessLevel,
          name,
          storeId,
          scopes: pareseScope,
        },
        { request }
      );
      return json({ ok: true });
    },
    async [ApiKeyActionEnum.deleteApiKye]() {
      const formData = await request.clone().formData();
      const apiKeyId = formData.get("apiKeyId") as string;
      await sdk.DeleteApiKey({ apiKeyId }, { request });
      return json(null);
    },
  });
}

export default function ApiKeys() {
  const actionData = useActionData<{ ok: true }>();
  const rootData = useRouteLoaderData("root") as RootData;
  const loaderData = useLoaderData() as ApiKeysData;
  const [createApi, toggleCreateApi] = useReducer((s) => !s, false);

  useEffect(() => {
    if (actionData?.ok && createApi) {
      toggleCreateApi();
    }
  }, [actionData?.ok, createApi]);

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
          <Text size="100">API Key</Text>
        </Box>
      </Flex>
      <PageHeader
        borderStyle="none"
        title="API Key"
        subtext="Private & Public API keys"
        primaryAction={{
          component: (
            <Button
              text="Create API Key"
              color="red"
              size="lg"
              onClick={toggleCreateApi}
              selected={createApi}
            />
          ),
          dropdownItems: [
            <Dropdown.Item
              onSelect={toggleCreateApi}
              option={{ label: "Create API Key", value: "create" }}
              key="api-key"
            />,
          ],
        }}
      />
      <Flex justifyContent="center">
        <Box paddingY={6} width="92.5%">
          <Flex direction="column" gap={12}>
            <Flex direction="column" gap={4}>
              <Heading size="300">Public API Key</Heading>
              <Table accessibilityLabel="Main example table">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <Text weight="bold">Business Name</Text>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <Text weight="bold">Public API Key</Text>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Text>{rootData.store?.name}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text>{rootData.store?.shortId}</Text>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Flex>
            {loaderData.apiKeys.length === 0 ? (
              <Callout
                iconAccessibilityLabel="warning"
                title="Private API Keys"
                type="warning"
                message="Create a private API keys with Read, Full or Restricted Access to your data"
              />
            ) : (
              <Flex direction="column" gap={4}>
                <Heading size="300">Private API Keys</Heading>
                <Table accessibilityLabel="Main example table">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        <Text weight="bold">Label</Text>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Text weight="bold">API Key</Text>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Text weight="bold">Access Level</Text>
                      </Table.HeaderCell>
                      {/* <Table.HeaderCell>
                        <Text weight="bold">Last Used</Text>
                      </Table.HeaderCell> */}

                      <Table.HeaderCell>
                        <Text weight="bold">Created At</Text>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Text weight="bold">Action</Text>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {loaderData.apiKeys?.map((keys) => (
                      <ApiRowData data={keys} key={keys.key} />
                    ))}
                  </Table.Body>
                </Table>
              </Flex>
            )}
          </Flex>
        </Box>
      </Flex>
      {createApi && <CreateApiKey close={toggleCreateApi} />}
    </>
  );
}

const ApiRowData = ({ data }: { data: ApiKeyFragment }) => {
  const [open, toggleOpen] = useReducer((s) => !s, false);
  const fetcher = useFetcher();
  const submission =
    fetcher.submission?.formData.get("_action") ===
    ApiKeyActionEnum.deleteApiKye;
  const loading =
    (submission && fetcher.state === "loading") ||
    (submission && fetcher.state === "submitting");

  const handleDeleteKey = useCallback(() => {
    const formData = new FormData();
    formData.append("apiKeyId", data.id);
    formData.append("_action", ApiKeyActionEnum.deleteApiKye);
    fetcher.submit(formData, { method: "POST" });
  }, [data.id, fetcher]);

  return (
    <Table.Row key={data.id}>
      <Table.Cell>
        <Text>{data.name}</Text>
      </Table.Cell>
      <Table.Cell>
        <Flex alignItems="center" justifyContent="start" gap={2}>
          {open ? (
            <Text>{data.key}</Text>
          ) : (
            <Text>••••••••••••••••••••••••••••</Text>
          )}
          <TapArea onTap={toggleOpen}>
            <Icon accessibilityLabel="show" icon={open ? "eye-hide" : "eye"} />
          </TapArea>
        </Flex>
      </Table.Cell>
      <Table.Cell>
        <Text>
          {data.accessLevel === ApiAccessLevel.Read
            ? "Read Access"
            : data.accessLevel === ApiAccessLevel.Full
            ? "Full Access"
            : "Resticted Access"}
        </Text>
      </Table.Cell>
      {/* <Table.Cell>
        <Text>
          {data.lastUsed
            ? dayjs(data.lastUsed as unknown as string)
                .local()
                .format("LLL")
            : "-"}
        </Text>
      </Table.Cell> */}

      <Table.Cell>
        <Text>
          {dayjs(data.createdAt as unknown as string)
            .local()
            .format("LL")}
        </Text>
      </Table.Cell>
      <Table.Cell>
        <Button
          disabled={loading}
          text="Delete"
          onClick={handleDeleteKey}
          color="white"
        />
      </Table.Cell>
    </Table.Row>
  );
};
