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
import type { BaseTriggerFilter } from "../../../graphql/__generated__/graphql";
import {
  BaseTriggerFilterTextValueExpressionEnum,
  BaseTriggerFilterTypeEnum,
} from "../../../graphql/__generated__/graphql";
import { NodeOptionContext } from "../nodes/NodeOptionProvider";
import { TriggerFilterSchema } from "../triggerFilterTypes";
import type { TriggerFilterFormikFormValues } from "../types";
import {
  AutomationSheetZIndex,
  AutomationWorkflowIndexActionEnum,
} from "../types";
import { NodeSheetContext } from "./NodeSheetProvider";
import Filter from "./triggerSheet/triggerFilter/Filter";

export default function TriggerSplitSheet({ close }: { close: () => void }) {
  const { state, update } = useContext(NodeSheetContext);

  const fetcher = useFetcher();
  const { state: optionState, update: nodeOptionUpdat } =
    useContext(NodeOptionContext);

  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  const isUpdate = state?.state === "updating";

  useEffect(() => {
    if (fetcher.type === "done") {
      update(null);
      nodeOptionUpdat(null);
    }
  }, [fetcher.type, nodeOptionUpdat, update]);

  const formik = useFormik<TriggerFilterFormikFormValues>({
    initialValues: {
      triggerFilter:
        state?.data?.value?.__typename ===
        "WorkflowStateTriggerSplitActivityValue"
          ? state.data.value.triggerFilter
          : undefined,
    },
    onSubmit: useCallback(
      (values) => {
        if (state?.data?.id) {
          const formData = new FormData();
          const jsonFlowFilter = JSON.stringify(values.triggerFilter);
          if (isUpdate) {
            formData.append(
              "_action",
              AutomationWorkflowIndexActionEnum.updateTriggerSplitState
            );
          } else {
            formData.append(
              "_action",
              AutomationWorkflowIndexActionEnum.createTriggerSplitNode
            );
            formData.append(
              "otherWise",
              optionState?.openOtherWiseOptions ? "true" : "false"
            );
          }
          formData.append("triggerFilter", jsonFlowFilter);
          formData.append("workflowStateId", state?.data.id);
          fetcher.submit(formData, { method: "post" });
        }
      },
      [fetcher, isUpdate, optionState?.openOtherWiseOptions, state?.data?.id]
    ),
    validationSchema: TriggerFilterSchema,
  });

  const handleAddInitialFilter = useCallback(() => {
    if (!formik.values.triggerFilter) {
      formik.setFieldValue("triggerFilter", [
        [
          {
            type: BaseTriggerFilterTypeEnum.Text,
            value: {
              __typename: "BaseTriggerFilterTextValue",
              textExpression: BaseTriggerFilterTextValueExpressionEnum.Equals,
            },
          },
        ],
      ] as BaseTriggerFilter[][]);
    }
  }, [formik]);

  const handleAndOperation = useCallback(() => {
    if (Array.isArray(formik.values.triggerFilter)) {
      const newFilterVals = produce(
        formik.values.triggerFilter,
        (draftState) => {
          draftState.push([]);
        }
      );

      const newState = produce(newFilterVals, (draftState) => {
        draftState[newFilterVals.length - 1]?.push({
          type: BaseTriggerFilterTypeEnum.Text,
          value: {
            __typename: "BaseTriggerFilterTextValue",
            textExpression: BaseTriggerFilterTextValueExpressionEnum.Equals,
          },
        });
      });

      formik.setFieldValue("triggerFilter", newState);
    }
  }, [formik]);

  return (
    <Layer zIndex={AutomationSheetZIndex}>
      <OverlayPanel
        accessibilityDismissButtonLabel="Close"
        accessibilityLabel="Animated sheet"
        heading={"Trigger Filters"}
        onDismiss={close}
        subHeading={
          <Box paddingX={8}>
            <Flex direction="column" gap={1}>
              <Text>
                Create a distinct split in your flow based on characteristics of
                the Trigger event.{" "}
              </Text>
              <Text>
                People that meet the following condition(s) will move to the YES
                side of this split:
              </Text>
            </Flex>
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
          {formik.values.triggerFilter === null ||
          formik.values.triggerFilter === undefined ||
          formik.values.triggerFilter?.length == 0 ? (
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
            {Array.isArray(formik.values.triggerFilter) && (
              <>
                {formik.values.triggerFilter?.map((data, index) => (
                  <Box key={index + "hello"}>
                    <Box rounding={3} borderStyle="none" padding={5}>
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
                      {Array.isArray(formik.values.triggerFilter) &&
                      index === formik.values.triggerFilter?.length - 1 ? (
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
