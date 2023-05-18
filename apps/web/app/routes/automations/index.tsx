import { json, redirect } from "@remix-run/node";
import {
  Link,
  Outlet,
  useFetcher,
  useLoaderData,
  useRouteLoaderData,
} from "@remix-run/react";
import {
  Box,
  Button,
  Callout,
  Container,
  Datapoint,
  Dropdown,
  Flex,
  Icon,
  IconButton,
  PageHeader,
  Status,
  Table,
  Text,
} from "gestalt";
import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { RootData } from "~/root";
import type { WorkflowFragment } from "../../graphql/__generated__/graphql";
import {
  EmailSentLimitStatus,
  WorkflowStatus,
} from "../../graphql/__generated__/graphql";
import { sdk } from "../../graphql/graphqlWrapper.server";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import type { AutomationData } from "./types";
import { AutomationActionEnum, DescriptionSchema } from "./types";

import playgourndCss from "@bespoke/common/dist/index.css";
import type {
  ActionArgs,
  LinksFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import { links as editorLinks } from "../../components/Editor";
import eidtorCss from "../../components/editor/editor.css";
import editorTextAreaCss from "../../components/editor/editorTextArea.css";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";

import { FormikProvider, useFormik } from "formik";
import { ClientOnly } from "remix-utils";
import BigContainer from "../../components/BigContainer";
import type { CommentEditorFormikValues } from "../../components/CommentEditor";
import Naviagation from "../../components/Navigation";
import Descirpition from "./Description";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

const ShareToCommunity = lazy(() => import("./ShareToCommunity"));

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
    title: `Automation Workflows | ${rootData.store?.name}`,
    description:
      "Create a workflow that sends your customers messages on autopilot.",
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
    sdk.getWorkflows(
      {
        subdomain,
      },
      { request }
    ),
  ]);

  const workflows = response[0];

  return json<AutomationData>({
    workflows: workflows.getWorkflows,
  });
}

export async function action({ request }: ActionArgs) {
  try {
    const formData = await request.formData();

    const action = formData.get("_action") as string;

    if (action === AutomationActionEnum.createWorkflow) {
      const storeId = formData.get("storeId") as string;
      const workflow = await sdk.CreateWorkflow(
        {
          storeId,
        },
        {
          request,
        }
      );

      if (workflow.createWorkflow) {
        return redirect(`/automations/${workflow.createWorkflow?.id}`);
      }
      return null;
    }

    if (action === AutomationActionEnum.deleteWorkflow) {
      const workflowId = formData.get("workflowId") as string;

      await sdk.DeleteWorkflow(
        {
          workflowId,
        },
        {
          request,
        }
      );
    }
    if (action === AutomationActionEnum.convertWorkflowToPublic) {
      const workflowId = formData.get("workflowId") as string;
      const descriptionHTML = formData.get("descriptionHTML") as string;
      const descriptionLexical = formData.get("descriptionLexical") as string;
      await sdk.ConvertWorkflowToPublic(
        {
          workflowId,
        },
        {
          request,
        }
      );
      await sdk.UpdateWorkflowDescription(
        {
          descriptionHTML,
          descriptionLexical,
          workflowId,
        },
        { request }
      );
    }
    if (action === AutomationActionEnum.updateDescription) {
      const workflowId = formData.get("workflowId") as string;
      const descriptionHTML = formData.get("descriptionHTML") as string;
      const descriptionLexical = formData.get("descriptionLexical") as string;

      await sdk.UpdateWorkflowDescription(
        {
          descriptionHTML,
          descriptionLexical,
          workflowId,
        },
        { request }
      );
    }

    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default function Automation() {
  const rootData = useRouteLoaderData("root") as RootData;
  const loaderData = useLoaderData<AutomationData>();
  const fetcher = useFetcher();

  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  const createAutomation = useCallback(() => {
    if (loading) return;
    if (!rootData?.store?.id) return;
    const formData = new FormData();
    formData.append("storeId", rootData?.store.id);
    formData.append("_action", AutomationActionEnum.createWorkflow);
    fetcher.submit(formData, { method: "post" });
  }, [fetcher, loading, rootData?.store?.id]);

  return (
    <BigContainer>
      <Flex alignItems="start">
        <Naviagation />
        <Flex.Item flex="grow">
          <Container>
            <PageHeader
              borderStyle="none"
              title="AUTOMATIONS"
              subtext="Create a workflow that sends your customers messages on autopilot."
              items={[
                <Datapoint
                  key="revenue"
                  size="md"
                  title="All Workflows"
                  value={`${loaderData.workflows?.length}` ?? "0"}
                />,
              ]}
              primaryAction={
                rootData?.isUserSubdomain
                  ? {
                      component: (
                        <Button
                          color="red"
                          size="lg"
                          text="Create"
                          role="button"
                          type="button"
                          onClick={createAutomation}
                          disabled={loading}
                        />
                      ),
                      dropdownItems: [
                        <Dropdown.Item
                          onSelect={createAutomation}
                          key="automations-editor"
                          option={{ label: "Create", value: "create" }}
                        />,
                      ],
                    }
                  : undefined
              }
            />
            <Flex justifyContent="center">
              <Box width="92%" paddingY={6}>
                {rootData?.store?.emailSentLimitStatus ===
                  EmailSentLimitStatus.Disallowed && (
                  <Box marginBottom={8}>
                    <Callout
                      iconAccessibilityLabel="warning"
                      title="Insufficient email sends."
                      key="add subs"
                      type="error"
                      message="You have reached the limit of email sends available for sending 'Emails' using the 'Email Action'. Upgrade Growth Path and send emails in your workflow automations."
                      primaryAction={{
                        label: "Growth Path",
                        accessibilityLabel: "Growth Path",
                        href: "/growth-path/choose",
                      }}
                    />
                  </Box>
                )}
                {loaderData.workflows?.length === 0 ||
                loaderData.workflows === null ||
                loaderData.workflows === undefined ? (
                  <Callout
                    iconAccessibilityLabel="warning"
                    title="Automation table is empty!"
                    key="automation"
                    type="info"
                    message="Create a new automation and start sending messages to your customers on autopilot"
                    // primaryAction={{
                    //   label: "Community",
                    //   accessibilityLabel: "Community",
                    //   href: "/community",
                    // }}
                  />
                ) : (
                  <WorkflowTable />
                )}
              </Box>
            </Flex>
          </Container>
        </Flex.Item>
      </Flex>
      <Outlet />
    </BigContainer>
  );
}

const WorkflowTable = () => {
  const loaderData = useLoaderData<AutomationData>();

  const workflows = useMemo(
    () =>
      loaderData.workflows?.map((workflow) => (
        <WorkflowRow
          //@ts-ignore
          workflow={workflow}
          key={workflow.id}
        />
      )),
    [loaderData.workflows]
  );

  return (
    <Box>
      {/* <Box marginBottom={4}>
        <Heading size="500">
          All Workflows ({loaderData.workflows?.length})
        </Heading>
      </Box> */}

      <ClientOnly>
        {() => (
          <Table accessibilityLabel="Sticky Column" stickyColumns={1}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Text weight="bold">Workflow</Text>
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Text weight="bold">Status</Text>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{workflows}</Table.Body>
          </Table>
        )}
      </ClientOnly>
    </Box>
  );
};

const WorkflowRow = ({ workflow }: { workflow: WorkflowFragment }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const [share, setShare] = useState(false);
  const fetcher = useFetcher();

  const [descriptionEdit, setDescriptionEdit] = useState(false);

  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  const isDeleteing =
    fetcher.submission?.formData.get("_action") ===
    AutomationActionEnum.deleteWorkflow;

  useEffect(() => {
    if (fetcher.type === "done") {
      setShare(false);
    }
  }, [fetcher.type]);

  const deleteWorkflow = useCallback(() => {
    const formData = new FormData();
    formData.append("_action", AutomationActionEnum.deleteWorkflow);
    formData.append("workflowId", workflow.id);
    fetcher.submit(formData, {
      method: "delete",
    });
  }, [fetcher, workflow.id]);

  const formik = useFormik<CommentEditorFormikValues & { workflowId: string }>({
    initialValues: {
      descriptionHTML: workflow.descriptionHTML ?? null,
      descriptionLexical: workflow.descriptionLexical ?? null,
      workflowId: workflow.id,
    },

    onSubmit: (values) => {
      if (!values.descriptionHTML || !values.descriptionLexical) return;
      const formData = new FormData();
      formData.append("workflowId", values.workflowId);
      formData.append(
        "_action",
        descriptionEdit
          ? AutomationActionEnum.updateDescription
          : AutomationActionEnum.convertWorkflowToPublic
      );
      formData.append("descriptionHTML", values.descriptionHTML);
      formData.append("descriptionLexical", values.descriptionLexical);
      fetcher.submit(formData, { method: "post" });
    },
    validationSchema: DescriptionSchema,
  });

  if (isDeleteing) {
    return null;
  }

  return (
    <>
      <Table.Row key={workflow.id}>
        <Table.Cell>
          <Flex alignItems="baseline" justifyContent="start">
            <Link to={`${workflow.id}`} prefetch="intent">
              <Text underline>{workflow.name}</Text>
            </Link>
          </Flex>
          {workflow.public && (
            <Box display="block">
              <FormikProvider value={formik}>
                <Descirpition />
              </FormikProvider>
              <Flex gap={1} alignItems="center" justifyContent="start">
                <IconButton
                  accessibilityLabel="edit"
                  icon="edit"
                  bgColor="lightGray"
                  iconColor="darkGray"
                  size="xs"
                  onClick={() => {
                    setDescriptionEdit(true);
                    setShare(true);
                  }}
                />
                <Text color="subtle" size="100" inline>
                  Edit
                </Text>
              </Flex>
            </Box>
          )}
          {share && (
            <FormikProvider value={formik}>
              <Suspense>
                <ShareToCommunity
                  close={() => setShare(false)}
                  convert={descriptionEdit ? false : true}
                  loading={loading}
                />
              </Suspense>
            </FormikProvider>
          )}
        </Table.Cell>
        <Table.Cell>
          <Flex alignItems="stretch" justifyContent="start">
            <Box display={workflow.public ? "none" : "block"}>
              {workflow?.workflowStatus === WorkflowStatus.Draft ? (
                <Status type="warning" title="Draft" />
              ) : workflow.workflowStatus === WorkflowStatus.Inactive ? (
                <Status type="halted" title="Inactive" />
              ) : (
                <Status type="ok" title="Live" />
              )}
            </Box>
            <Box
              display={workflow.public ? "flex" : "none"}
              alignItems="center"
            >
              <Icon
                accessibilityLabel="globe"
                icon="globe-checked"
                color="success"
                size={20}
              />
              <Box marginStart={2}>
                <Text>Shared</Text>
              </Box>
            </Box>
          </Flex>
        </Table.Cell>

        <Table.Cell>
          <IconButton
            icon="ellipsis"
            onClick={() => setOpen((s) => !s)}
            accessibilityLabel="ellipsis"
            ref={anchorRef}
          />
          {open && (
            <Dropdown
              anchor={anchorRef.current}
              id="truncation-dropdown-example"
              onDismiss={() => setOpen(false)}
            >
              <Dropdown.Item
                onSelect={deleteWorkflow}
                option={{
                  value: "delete",
                  label: "Delete",
                }}
              />
              {/* {workflow.public ? (
                <></>
              ) : (
                <Dropdown.Item
                  onSelect={() => {
                    setShare(true);
                    setOpen(false);
                  }}
                  option={{
                    value: "convert",
                    label: "Share To Community",
                  }}
                />
              )} */}
            </Dropdown>
          )}
        </Table.Cell>
      </Table.Row>
    </>
  );
};
