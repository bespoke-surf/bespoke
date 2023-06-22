import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useTransition,
} from "@remix-run/react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Spinner,
  Status,
  Sticky,
  Text,
  TextField,
  Tooltip,
} from "gestalt";
import { useCallback, useContext } from "react";
import {
  WorkflowActivityType,
  WorkflowStatus,
} from "../../../graphql/__generated__/graphql";
import { calculateLocalTime } from "../../../utils/calculateLocalTime";
import { NodeSheetContext } from "../../automations.$workflowId.index/sheets/NodeSheetProvider";
import type { AutomationWorkflowData } from "../../automations.$workflowId/types";
import {
  AutomationWorkflowActionEnum,
  AutomationWorkflowSchema,
  WorkflowBarZIndex,
} from "../../automations.$workflowId/types";

interface MyFormValues {
  name: string;
}
export default function WorkflowBar() {
  const loaderData = useLoaderData() as AutomationWorkflowData;
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const transition = useTransition();

  const { state } = useContext(NodeSheetContext);

  const loading = fetcher.state === "loading" || fetcher.state === "submitting";
  const transtionLoading =
    transition.state == "loading" || transition.state === "submitting";

  const goBack = useCallback(() => {
    navigate("..");
  }, [navigate]);

  const handleSubmit = useCallback(
    (values: MyFormValues) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append(
        "_action",
        AutomationWorkflowActionEnum.updateWorkflowName
      );
      fetcher.submit(formData, {
        method: "patch",
      });
    },
    [fetcher]
  );

  const formik = useFormik<MyFormValues>({
    initialValues: { name: loaderData.workflow?.name ?? "" },
    onSubmit: handleSubmit,
    validationSchema: AutomationWorkflowSchema,
  });

  const handleKeyDown = useCallback(
    ({ event }: { event: React.KeyboardEvent<HTMLInputElement> }) => {
      if (event.key === "Enter") {
        event.preventDefault();
        formik.handleSubmit();
      }
    },
    [formik]
  );

  const handleWorkflowStatus = useCallback(() => {
    const formData = new FormData();
    if (
      loaderData.workflow?.workflowStatus === WorkflowStatus.Draft ||
      loaderData.workflow?.workflowStatus === WorkflowStatus.Inactive
    ) {
      formData.append("_action", AutomationWorkflowActionEnum.turnOnWorkflow);
    } else {
      formData.append("_action", AutomationWorkflowActionEnum.turnOffWorkflow);
    }
    fetcher.submit(formData, { method: "post" });
  }, [fetcher, loaderData.workflow?.workflowStatus]);

  if (state?.data?.workflowActivityType === WorkflowActivityType.SendEmail)
    return null;

  return (
    <Sticky top={0} zIndex={WorkflowBarZIndex}>
      <Box borderStyle="raisedBottomShadow" padding={2} color="light">
        <Flex
          justifyContent="between"
          alignItems="center"
          gap={{ row: 0, column: 2 }}
          wrap
        >
          <Flex gap={3} alignItems="center" wrap>
            <IconButton
              onClick={goBack}
              accessibilityLabel="back"
              icon="arrow-back"
            />
            <Box display={loaderData.workflow?.public ? "none" : "block"}>
              {loaderData?.workflow?.workflowStatus === WorkflowStatus.Draft ? (
                <Status type="warning" title="Draft" />
              ) : loaderData?.workflow?.workflowStatus ===
                WorkflowStatus.Inactive ? (
                <Status type="halted" title="Inactive" />
              ) : (
                <Status type="ok" title="Live" />
              )}
            </Box>
            <Box
              display={loaderData.workflow?.public ? "flex" : "none"}
              alignItems="center"
            >
              <Icon
                accessibilityLabel="globe"
                icon="globe-checked"
                color="success"
              />
              <Box marginStart={1}>
                <Text>Shared</Text>
              </Box>
            </Box>

            <Tooltip
              text={`Changes saved on ${calculateLocalTime(
                loaderData.workflow?.updatedAt,
                "LLL"
              )}`}
            >
              {loading || transtionLoading ? (
                <Spinner accessibilityLabel="loading" show size="sm" />
              ) : (
                <Icon
                  icon="check-circle"
                  color="subtle"
                  accessibilityLabel="check-circle"
                />
              )}
            </Tooltip>
            <Flex alignItems="center" gap={2}>
              <TextField
                id="name"
                size="lg"
                name="name"
                onChange={({ event }) => formik.handleChange(event)}
                onBlur={({ event }) => formik.handleBlur(event)}
                value={formik.values.name}
                errorMessage={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : undefined
                }
                onKeyDown={handleKeyDown}
              />
              {loaderData.workflow?.name !== formik.values.name && (
                <Button
                  text="Save"
                  color="red"
                  onClick={() => formik.handleSubmit()}
                />
              )}
            </Flex>
          </Flex>
          <Button
            text={`Turn ${
              loaderData.workflow?.workflowStatus === WorkflowStatus.Live
                ? "off"
                : "on"
            } workflow`}
            color={
              loaderData.workflow?.workflowStatus === WorkflowStatus.Live
                ? "white"
                : "red"
            }
            onClick={handleWorkflowStatus}
          />
        </Flex>
      </Box>
    </Sticky>
  );
}
