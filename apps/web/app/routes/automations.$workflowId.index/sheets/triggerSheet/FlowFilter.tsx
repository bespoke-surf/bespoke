import { useFetcher, useRouteLoaderData } from "@remix-run/react";
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
import type { AutomationWorkflowData } from "../../../automations.$workflowId/types";
import { FlowFilterShcema } from "../../flowFilterTypes";
import type { FlowFilterFormikFormValues } from "../../types";
import {
  AutomationSheetZIndex,
  AutomationWorkflowIndexActionEnum,
} from "../../types";
import { NodeSheetContext } from "../NodeSheetProvider";
import Filter from "./flowfilter/Filter";

export default function FlowFilter({ close }: { close: () => void }) {
  const { state } = useContext(NodeSheetContext);
  const parentLoaderData = useRouteLoaderData(
    "routes/automations.$workflowId/index"
  ) as AutomationWorkflowData;
  const fetcher = useFetcher();

  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  useEffect(() => {
    if (fetcher.type === "done") {
      close();
    }
  }, [close, fetcher.type]);

  const formik = useFormik<FlowFilterFormikFormValues>({
    initialValues: {
      flowFilter: parentLoaderData?.workflow?.flowFilter ?? undefined,
    },
    onSubmit: useCallback(
      (values) => {
        if (state?.data?.id) {
          const formData = new FormData();
          const jsonFlowFilter = JSON.stringify(values.flowFilter);
          formData.append(
            "_action",
            AutomationWorkflowIndexActionEnum.updateFlowFilter
          );
          formData.append("flowFilter", jsonFlowFilter);
          fetcher.submit(formData, { method: "post" });
        }
      },
      [fetcher, state?.data?.id]
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
        heading={"Flow Filters"}
        onDismiss={close}
        subHeading={
          <Box paddingX={8}>
            <Text>
              Flow filters allow you to restrict the flow to only certain people
              (e.g. first time customers, repeat customers, subscribers from
              this month, etc.)
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
