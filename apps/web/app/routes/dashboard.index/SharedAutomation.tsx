import { json, redirect } from "@remix-run/node";
import {
  useFetcher,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  SegmentedControl,
  Spinner,
  TapArea,
  Text,
  Tooltip,
  WashAnimated,
} from "gestalt";
import type { RootData } from "../../root";
import { calculateTimeWhile } from "../../utils/calculateTimeWhile";

import playgourndCss from "@bespoke/common/dist/index.css";
import type {
  ActionArgs,
  LinksFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import { FormikProvider, useFormik } from "formik";
import millify from "millify";
import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { InView } from "react-intersection-observer";
import { ClientOnly } from "remix-utils";
import type { CommentEditorFormikValues } from "../../components/CommentEditor";
import { links as editorLinks } from "../../components/Editor";
import eidtorCss from "../../components/editor/editor.css";
import editorTextAreaCss from "../../components/editor/editorTextArea.css";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { WorkflowFragment } from "../../graphql/__generated__/graphql";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { isPrivateRoute } from "../../utils/utils.server";
import { Descirpition } from "./Description";
import type { CommunityLoaderData } from "./types";
import {
  CommunityAutomationActionEnum,
  COMMUNITY_WAYPOINT_TRIGGER_AT,
} from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

const ShowMore = lazy(() => import("./ShowMore"));

export const links: LinksFunction = () => {
  return [
    ...editorLinks(),
    {
      rel: "stylesheet",
      href: eidtorCss,
    },
    {
      rel: "stylesheet",
      href: editorTextAreaCss,
    },
    {
      rel: "stylesheet",
      href: playgourndCss,
    },
  ];
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Community | ${rootData.store?.name}`,
    description:
      "Explore the community shared tools. Empowering humanity to become fianancially independent.",
  };
};

export async function loader({ request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  const parsedUrl = new URL(request.url).searchParams;
  const skip = parsedUrl.get("skip") ? Number(parsedUrl.get("skip")) : 0;

  const workflows = await sdk.GetPublicWorkflows(
    {
      take: 15,
      skip: skip,
    },
    { request }
  );

  return json<CommunityLoaderData>({
    workflows: workflows.getPublicWorkflows,
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const action = formData.get("_action") as string;

  if (action === CommunityAutomationActionEnum.replicateWorkflow) {
    const storeId = formData.get("storeId") as string;
    const replicaWorkflowId = formData.get("replicaWorkflowId") as string;

    const workflow = await sdk.ReplicateWorkflow(
      {
        replicaWorkflowId,
        storeId,
      },
      { request }
    );
    if (workflow.replicateWorkflow) {
      return redirect(`/automations/${workflow.replicateWorkflow.id}`);
    }
  }

  return null;
}

export default function SignupForms() {
  const loaderData = useLoaderData<CommunityLoaderData>();

  const [items, setItems] = useState<(typeof loaderData)["workflows"]>(
    loaderData.workflows ?? []
  );

  const fetcher = useFetcher<CommunityLoaderData>();

  useEffect(() => {
    if (fetcher.data) {
      setItems((prevData) => [
        ...(prevData ?? []),
        ...(fetcher.data?.workflows ?? []),
      ]);
    }
  }, [fetcher.data]);

  const handleFetchMore = useCallback(
    (inView: boolean) => {
      console.log(inView, items?.length);
      if (!inView) return;
      fetcher.load(`/dashboard/?index?skip=${items?.length}`);
    },
    [fetcher, items?.length]
  );

  const communityData = useMemo(
    () =>
      items?.map((data, index) => (
        <React.Fragment key={data.id}>
          <ClientOnly>
            {() => (
              <>
                <CommunityAutomations
                  //@ts-ignore
                  data={data}
                />
                {index === items?.length - COMMUNITY_WAYPOINT_TRIGGER_AT && (
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
    <Flex justifyContent="center">
      <Box width="100%" paddingY={6}>
        <Box marginBottom={8}>
          <SegmentedControl
            items={[
              <Flex
                alignItems="center"
                justifyContent="start"
                key="hot"
                gap={1}
              >
                <Icon
                  //@ts-ignore
                  icon="flame"
                  accessibilityLabel="Pin"
                  color="default"
                />
                <Text>Hot</Text>
              </Flex>,
              <Flex
                alignItems="center"
                justifyContent="start"
                key="new"
                gap={1}
              >
                <Icon
                  icon="circle-outline"
                  accessibilityLabel="Pin"
                  color="default"
                />
                <Text>New</Text>
              </Flex>,
              <Flex
                alignItems="center"
                justifyContent="start"
                key="top"
                gap={1}
              >
                <Icon
                  icon="graph-bar"
                  accessibilityLabel="Pin"
                  color="default"
                />
                <Text>Top</Text>
              </Flex>,
            ]}
            selectedItemIndex={0}
            onChange={() => undefined}
          />
        </Box>

        <Flex direction="column" gap={4}>
          {communityData}
          <Box />
        </Flex>
      </Box>
    </Flex>
  );
}

export const CommunityAutomations = ({
  data,
  disable = false,
}: {
  data: WorkflowFragment;
  disable?: boolean;
}) => {
  const fetcher = useFetcher();
  const rootData = useRouteLoaderData("root") as RootData;
  const [showMore, setShowMore] = useState(false);

  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  const formik = useFormik<CommentEditorFormikValues>({
    initialValues: {
      descriptionLexical: data.descriptionLexical ?? "",
      descriptionHTML: null,
    },
    onSubmit: () => undefined,
  });

  const handleReplicate = useCallback(() => {
    if (!rootData.store?.id) return;
    const formData = new FormData();
    formData.append("_action", CommunityAutomationActionEnum.replicateWorkflow);
    formData.append("storeId", rootData?.store?.id);
    formData.append("replicaWorkflowId", data.id);
    fetcher.submit(formData, { method: "post" });
  }, [data.id, fetcher, rootData.store?.id]);

  return (
    <FormikProvider value={formik}>
      <Box borderStyle="sm" rounding={2} display="flex">
        <Box padding={2} color="lightWash">
          <Flex direction="column" alignItems="center" gap={2}>
            <IconButton
              accessibilityLabel="arrow-up"
              icon="arrow-up"
              size="xs"
              bgColor="white"
            />
            <Text>1</Text>
            <IconButton
              accessibilityLabel="arrow-up"
              icon="arrow-down"
              size="xs"
              bgColor="white"
            />
          </Flex>
        </Box>
        <Box paddingX={3} paddingY={2}>
          <TapArea onTap={() => setShowMore(true)}>
            <Flex gap={3} direction="column" alignItems="start">
              <Flex gap={1} alignItems="center">
                <IconButton
                  //@ts-ignore
                  icon="desktop"
                  bgColor="lightGray"
                  size="xs"
                />
                <Text size="100" weight="bold" color="subtle">
                  Automation
                </Text>
                <Text color="subtle">•</Text>
                <Text size="100" color="subtle">
                  Posted {calculateTimeWhile(data.createdAt)}
                </Text>
              </Flex>
              <Text size="400" weight="bold">
                {data.name}
              </Text>
            </Flex>

            <Descirpition
              descriptionLexical={data.descriptionLexical ?? null}
            />
          </TapArea>

          <Box marginTop={4} marginBottom={1}>
            <Flex alignItems="stretch" justifyContent="start" gap={8}>
              <WashAnimated>
                <TapArea onTap={handleReplicate}>
                  {disable ? (
                    <Tooltip
                      text={
                        disable ? "Enabled after onboarding is complete" : ""
                      }
                    >
                      <ReplicateButton loading={loading} />
                    </Tooltip>
                  ) : (
                    <ReplicateButton loading={loading} />
                  )}
                </TapArea>
              </WashAnimated>
              <Tooltip text="Replicated by others">
                <Flex justifyContent="start" alignItems="center" gap={1}>
                  <Icon
                    icon="person"
                    accessibilityLabel="person"
                    color="subtle"
                    size={13}
                  />
                  <TapArea onTap={handleReplicate}>
                    <Text color="subtle" size="100">
                      {millify(data.replicationCount)}
                    </Text>
                  </TapArea>
                </Flex>
              </Tooltip>
            </Flex>
          </Box>
        </Box>
        {showMore && (
          <Suspense>
            <ShowMore close={() => setShowMore(false)} />
          </Suspense>
        )}
      </Box>
    </FormikProvider>
  );
};

const ReplicateButton = ({ loading }: { loading: boolean }) => {
  return (
    <Flex justifyContent="start" alignItems="center" gap={1}>
      {loading ? (
        <Box>
          <Spinner accessibilityLabel="loading" show />
        </Box>
      ) : (
        <Icon icon="duplicate" accessibilityLabel="duplicate" color="subtle" />
      )}
      <Text color="subtle" size="100">
        Replicate
      </Text>
    </Flex>
  );
};
