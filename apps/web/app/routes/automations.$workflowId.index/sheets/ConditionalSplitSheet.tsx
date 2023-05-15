import { useFetcher } from "@remix-run/react";
import { FormikProvider, useFormik } from "formik";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Layer,
  OverlayPanel,
  Spinner,
  Text,
  Tooltip,
} from "gestalt";
import produce from "immer";
import { useCallback, useContext, useEffect } from "react";
import { FlowFilterShcema } from "../flowFilterTypes";
import { NodeOptionContext } from "../nodes/NodeOptionProvider";
import type { FlowFilterFormikFormValues } from "../types";
import {
  AutomationSheetZIndex,
  AutomationWorkflowIndexActionEnum,
} from "../types";
import { NodeSheetContext } from "./NodeSheetProvider";
import Filter from "./triggerSheet/flowfilter/Filter";

export default function ConditionalSplitSheet({
  close,
}: {
  close: () => void;
}) {
  const fetcher = useFetcher();
  const { state, update } = useContext(NodeSheetContext);
  const { state: optionState, update: nodeOptionUpdat } =
    useContext(NodeOptionContext);

  const isUpdate = state?.state === "updating";

  useEffect(() => {
    if (fetcher.type === "done") {
      update(null);
      nodeOptionUpdat(null);
    }
  }, [fetcher.type, nodeOptionUpdat, update]);

  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  const formik = useFormik<FlowFilterFormikFormValues>({
    initialValues: {
      flowFilter:
        state?.data?.value?.__typename ===
        "WorkflowStateConditionalSplitActivityValue"
          ? state.data.value.flowFilter
          : undefined,
    },
    onSubmit: useCallback(
      (values) => {
        if (state?.data?.id) {
          const formData = new FormData();
          const jsonFlowFilter = JSON.stringify(values.flowFilter);
          if (isUpdate) {
            formData.append(
              "_action",
              AutomationWorkflowIndexActionEnum.updateConditionalSplit
            );
          } else {
            formData.append(
              "_action",
              AutomationWorkflowIndexActionEnum.createConditionalSplitNode
            );
            formData.append(
              "otherWise",
              optionState?.openOtherWiseOptions ? "true" : "false"
            );
          }
          formData.append("flowFilter", jsonFlowFilter);
          formData.append("workflowStateId", state?.data.id);
          fetcher.submit(formData, { method: "post" });
        }
      },
      [fetcher, isUpdate, optionState?.openOtherWiseOptions, state?.data?.id]
    ),
    validationSchema: FlowFilterShcema,
  });

  const handleAddInitialFilter = useCallback(() => {
    if (!formik.values.flowFilter) {
      formik.setFieldValue("flowFilter", [[{}]]);
    }
    if (formik.values.flowFilter?.length === 0) {
      const newState = produce(formik.values.flowFilter, (draftState) => {
        draftState.push([{}]);
      });

      formik.setFieldValue("flowFilter", newState);
    }
  }, [formik]);

  const handleAndOperation = useCallback(() => {
    if (Array.isArray(formik.values.flowFilter)) {
      const newFilterVals = produce(formik.values.flowFilter, (draftState) => {
        draftState.push([]);
      });

      const newState = produce(newFilterVals, (draftState) => {
        draftState[newFilterVals.length - 1]?.push({
          condition: undefined,
        });
      });

      // formik.values.flowFilter.push([{}]);
      // console.log(formik.values.flowFilter);
      formik.setFieldValue("flowFilter", newState);
    }
  }, [formik]);

  return (
    <Layer zIndex={AutomationSheetZIndex}>
      <OverlayPanel
        accessibilityDismissButtonLabel="Close"
        accessibilityLabel="Animated sheet"
        heading={"Conditional Split"}
        onDismiss={close}
        subHeading={
          <Box paddingX={8}>
            <Text>
              Create a distinct split in your flow based on recipient properties
              or behavior. People that meet the following condition(s) will move
              to the YES side of this split:
            </Text>
          </Box>
        }
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
                  text={"Back"}
                  size="lg"
                  onClick={onDismissStart}
                />
                <Button
                  color="red"
                  size="lg"
                  text="Save"
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                />
              </Flex>
            )}
          </>
        )}
      >
        <Box paddingY={6}>
          {formik.values.flowFilter === null ||
          formik.values.flowFilter === undefined ||
          formik.values.flowFilter?.length == 0 ? (
            <Flex justifyContent="center">
              <Tooltip text="Add a Flow filter">
                <IconButton
                  accessibilityLabel="add"
                  icon="add"
                  size="lg"
                  bgColor="red"
                  onClick={handleAddInitialFilter}
                />
              </Tooltip>
            </Flex>
          ) : null}
          <FormikProvider value={formik}>
            {Array.isArray(formik.values.flowFilter) && (
              <>
                {formik.values.flowFilter?.map((data, index) => (
                  <Box key={index + "hello"}>
                    <Box rounding={3} borderStyle="sm" padding={5}>
                      {data.map((_, index2) => {
                        return (
                          <Filter
                            key={index2 + "hi"}
                            parentIndex={index}
                            currentIndex={index2}
                          />
                        );
                      })}
                    </Box>
                    <Box marginTop={4} marginBottom={4}>
                      {Array.isArray(formik.values.flowFilter) &&
                      index === formik.values.flowFilter?.length - 1 ? (
                        <Button text="And" onClick={handleAndOperation} />
                      ) : (
                        <Button text="And" disabled />
                      )}
                    </Box>
                  </Box>
                ))}
              </>
            )}
          </FormikProvider>
        </Box>
      </OverlayPanel>
    </Layer>
  );
}
