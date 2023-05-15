import {
  Box,
  Divider,
  Icon,
  Layer,
  OverlayPanel,
  Spinner,
  TapArea,
} from "gestalt";
import type { AutomationActionData } from "../types";
import {
  AutomationSheetZIndex,
  AutomationWorkflowIndexActionEnum,
  TriggerScheetSchema,
} from "../types";

import { useFetcher } from "@remix-run/react";
import { FormikProvider, useFormik } from "formik";
import { Button, Flex, Text } from "gestalt";
import { useCallback, useContext, useEffect, useState } from "react";
import type { MetricType } from "../../../graphql/__generated__/graphql";
import { NodeSheetContext } from "./NodeSheetProvider";
import FlowFilter from "./triggerSheet/FlowFilter";
import ListTrigger from "./triggerSheet/ListTrigger";
import MetricTrigger from "./triggerSheet/MetricTrigger";
import TriggerFilter from "./triggerSheet/TriggerFilter";

export interface MyTriggerSheetFormValues {
  listId?: string;
  metricType?: MetricType;
}

export default function TriggerSheet({ close }: { close: () => void }) {
  const fetcher = useFetcher<AutomationActionData>();
  const { state, update } = useContext(NodeSheetContext);

  const loading = fetcher.state === "loading" || fetcher.state === "submitting";
  const shouldUpdate = state?.state === "updating" ? true : false;
  const [flowFilter, setFlowFilter] = useState(false);
  const [triggerFilter, setTriggerFilter] = useState(false);

  const [tirggerType, setTrigger] = useState<
    "listTrigger" | "metricTrigger" | undefined
  >(
    state?.data?.value?.__typename === "WorkflowStateListTriggerActivityValue"
      ? "listTrigger"
      : state?.data?.value?.__typename ===
        "WorkflowStateMetricTriggerActivityValue"
      ? "metricTrigger"
      : undefined
  );

  useEffect(() => {
    if (fetcher.data?.flushState && fetcher.type === "done") {
      update(null);
    }
  }, [fetcher.data?.flushState, fetcher.type, update]);

  const handleSubmit = useCallback(
    (values: MyTriggerSheetFormValues) => {
      const formData = new FormData();
      if (values.listId) {
        formData.append("listId", values.listId);
        if (shouldUpdate && state?.data?.id) {
          formData.append(
            "_action",
            AutomationWorkflowIndexActionEnum.updateListTrigger
          );
          formData.append("workflowStateId", state?.data?.id);
        } else {
          formData.append(
            "_action",
            AutomationWorkflowIndexActionEnum.createListTrigger
          );
        }
      }
      if (values.metricType) {
        formData.append("metricType", values.metricType);
        if (shouldUpdate && state?.data?.id) {
          formData.append(
            "_action",
            AutomationWorkflowIndexActionEnum.updateMetricTrigger
          );
          formData.append("workflowStateId", state?.data.id);
        } else {
          formData.append(
            "_action",
            AutomationWorkflowIndexActionEnum.createMetricTrigger
          );
        }
      }

      fetcher.submit(formData, { method: "post" });
    },
    [fetcher, shouldUpdate, state?.data?.id]
  );

  const formik = useFormik<MyTriggerSheetFormValues>({
    initialValues: {
      listId:
        state?.data?.value?.__typename ===
        "WorkflowStateListTriggerActivityValue"
          ? state.data?.value.listId
          : undefined,
      metricType:
        state?.data?.value?.__typename ===
        "WorkflowStateMetricTriggerActivityValue"
          ? state.data?.value.metricType
          : undefined,
    },
    onSubmit: handleSubmit,
    validationSchema:
      tirggerType === "listTrigger"
        ? TriggerScheetSchema.omit(["metricType"])
        : TriggerScheetSchema.omit(["listId"]),
  });

  return (
    <Layer zIndex={AutomationSheetZIndex}>
      <OverlayPanel
        accessibilityDismissButtonLabel="Close"
        accessibilityLabel="Animated sheet"
        heading={shouldUpdate ? "Update Trigger" : "Select A Trigger"}
        onDismiss={close}
        size="md"
        footer={({ onDismissStart }) => (
          <>
            {loading ? (
              <Flex alignItems="center" justifyContent="end" gap={2}>
                <Spinner show accessibilityLabel="loading" />
              </Flex>
            ) : (
              <Flex alignItems="center" justifyContent="end" gap={2}>
                <Button
                  color="gray"
                  text={"Cancel"}
                  onClick={onDismissStart}
                  disabled={loading}
                  size="lg"
                />

                {tirggerType && (
                  <Button
                    size="lg"
                    color="red"
                    text="Save"
                    onClick={() => formik.handleSubmit()}
                    disabled={loading}
                  />
                )}
              </Flex>
            )}
          </>
        )}
      >
        <FormikProvider value={formik}>
          <Flex direction="column" gap={{ column: 8, row: 0 }}>
            {!tirggerType && (
              <Flex direction="column" gap={4}>
                <TapArea onTap={() => setTrigger("listTrigger")}>
                  <Box borderStyle="shadow" padding={5} rounding={4}>
                    <Flex gap={2} direction="column">
                      <Icon
                        accessibilityLabel="list"
                        icon="person-add"
                        color="dark"
                        size={24}
                      />
                      <Text weight="bold" color="dark" size="400">
                        List
                      </Text>
                      <Text size="300" color="subtle">
                        Workflow gets triggered when people are added to a
                        specific list.
                      </Text>
                    </Flex>
                  </Box>
                </TapArea>
                <TapArea onTap={() => setTrigger("metricTrigger")}>
                  <Box borderStyle="shadow" padding={5} rounding={4}>
                    <Flex gap={2} direction="column">
                      <Icon
                        accessibilityLabel="list"
                        icon="hand-pointing"
                        color="dark"
                        size={24}
                      />
                      <Text weight="bold" color="dark" size="400">
                        Metric
                      </Text>
                      <Text size="300" color="subtle">
                        Workflow gets triggered when people take a specific
                        action (eg. Placed Order).
                      </Text>
                    </Flex>
                  </Box>
                </TapArea>
              </Flex>
            )}
            {tirggerType === "listTrigger" && <ListTrigger loading={loading} />}

            {tirggerType === "metricTrigger" && (
              <MetricTrigger loading={loading} />
            )}
            {shouldUpdate && <Divider />}

            {tirggerType === "metricTrigger" && (
              <Box opacity={shouldUpdate ? 1 : 0.5}>
                <TapArea
                  disabled={!shouldUpdate}
                  onTap={() => setTriggerFilter(true)}
                >
                  <Flex alignItems="center" justifyContent="between">
                    <Flex direction="column" gap={{ column: 4, row: 0 }}>
                      <Text weight="bold">TRIGGER FILTERS</Text>
                      <Text>Filter on properties of the trigger.</Text>
                    </Flex>
                    <Icon
                      accessibilityLabel="carret"
                      icon="arrow-forward"
                      size={12}
                      color="dark"
                    />
                  </Flex>
                </TapArea>
                <Box marginTop={6}>
                  <Divider />
                </Box>
              </Box>
            )}
            {tirggerType && (
              <Box opacity={shouldUpdate ? 1 : 0.5}>
                <TapArea
                  disabled={!shouldUpdate}
                  onTap={() => setFlowFilter(true)}
                >
                  <Flex alignItems="center" justifyContent="between">
                    <Flex direction="column" gap={{ column: 4, row: 0 }}>
                      <Text weight="bold">FLOW FILTERS</Text>
                      <Text>Restrict the flow to only certian people.</Text>
                    </Flex>
                    <Icon
                      accessibilityLabel="carret"
                      icon="arrow-forward"
                      size={12}
                      color="dark"
                    />
                  </Flex>
                </TapArea>
              </Box>
            )}
          </Flex>
        </FormikProvider>
        {flowFilter && <FlowFilter close={() => setFlowFilter(false)} />}
        {triggerFilter && (
          <TriggerFilter close={() => setTriggerFilter(false)} />
        )}
      </OverlayPanel>
    </Layer>
  );
}
