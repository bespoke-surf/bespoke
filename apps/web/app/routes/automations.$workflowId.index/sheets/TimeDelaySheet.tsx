import {
  Box,
  Layer,
  NumberField,
  OverlayPanel,
  SelectList,
  SlimBanner,
  Spinner,
} from "gestalt";
import {
  AutomationSheetZIndex,
  AutomationWorkflowIndexActionEnum,
  DelaySheetSchema,
} from "../types";

import { useFetcher } from "@remix-run/react";
import { useFormik } from "formik";
import { Button, Flex, Text } from "gestalt";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { DelayTypeEnum } from "../../../graphql/__generated__/graphql";
import { NodeOptionContext } from "../nodes/NodeOptionProvider";
import { NodeSheetContext } from "./NodeSheetProvider";

const options = [
  { label: "day(s)", value: DelayTypeEnum.Days },
  { label: "hour(s)", value: DelayTypeEnum.Hours },
  { label: "minute(s)", value: DelayTypeEnum.Minutes },
];

const selectListOptions = options.map(({ label, value }) => (
  <SelectList.Option label={label} value={value} key={value} />
));

interface MyFormValues {
  delayType: DelayTypeEnum;
  delayInDelayType: number;
}

export default function TimeDelaySheet({ close }: { close: () => void }) {
  const fetcher = useFetcher();
  const { state, update } = useContext(NodeSheetContext);
  const { state: optionState, update: nodeOptionUpdat } =
    useContext(NodeOptionContext);
  const loading = fetcher.state === "loading" || fetcher.state === "submitting";

  useEffect(() => {
    if (fetcher.type === "done") {
      update(null);
      nodeOptionUpdat(null);
    }
  }, [fetcher.type, nodeOptionUpdat, update]);

  const shouldUpdate = state?.state === "updating" ? true : false;

  const delayType =
    state?.data?.value?.__typename === "WorkflowStateDelayActivityValue" &&
    shouldUpdate
      ? state.data?.value.delayType
      : DelayTypeEnum.Days;

  const delayInDelayType = useMemo(() => {
    if (
      state?.data?.value?.__typename === "WorkflowStateDelayActivityValue" &&
      shouldUpdate
    ) {
      if (delayType === DelayTypeEnum.Days) {
        return state.data?.value.delayInMilliseconds / 86400000;
      }
      if (delayType === DelayTypeEnum.Hours) {
        return state.data?.value?.delayInMilliseconds / 3600000;
      }
      if (delayType === DelayTypeEnum.Minutes) {
        return state.data.value.delayInMilliseconds / 60000;
      }
      return 0;
    } else {
      return 0;
    }
  }, [delayType, shouldUpdate, state?.data?.value]);

  const handleSubmit = useCallback(
    (values: MyFormValues) => {
      if (values.delayInDelayType === 0 || !state?.data?.id) return;
      const formData = new FormData();
      formData.append("delayType", values.delayType);
      formData.append(
        "otherWise",
        optionState?.openOtherWiseOptions ? "true" : "false"
      );
      let delayInMilliseconds = 0;
      if (values.delayType === DelayTypeEnum.Days) {
        delayInMilliseconds = values.delayInDelayType * 86400000;
      } else if (values.delayType === DelayTypeEnum.Hours) {
        delayInMilliseconds = values.delayInDelayType * 3600000;
      } else {
        delayInMilliseconds = values.delayInDelayType * 60000;
      }
      formData.append("delayInMilliseconds", String(delayInMilliseconds));
      formData.append("workflowStateId", state?.data.id);
      if (shouldUpdate) {
        formData.append(
          "_action",
          AutomationWorkflowIndexActionEnum.updateDelayState
        );
      } else {
        formData.append(
          "_action",
          AutomationWorkflowIndexActionEnum.createNewDalayNode
        );
      }
      fetcher.submit(formData, { method: "post" });
    },
    [fetcher, shouldUpdate, state?.data?.id]
  );

  const formik = useFormik<MyFormValues>({
    initialValues: {
      delayInDelayType,
      delayType,
    },
    onSubmit: handleSubmit,
    validationSchema: DelaySheetSchema,
  });

  return (
    <Layer zIndex={AutomationSheetZIndex}>
      <OverlayPanel
        accessibilityDismissButtonLabel="Close"
        accessibilityLabel="Animated sheet"
        heading={`${shouldUpdate ? "Update" : ""}Time Delay`}
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
                  text="Cancel"
                  onClick={onDismissStart}
                  disabled={loading}
                />
                <Button
                  color="red"
                  text={shouldUpdate ? "Update" : "Create"}
                  onClick={() => formik.handleSubmit()}
                  disabled={loading}
                />
              </Flex>
            )}
          </>
        )}
      >
        <Flex direction="column" gap={12}>
          <Flex direction="column" gap={4}>
            <Text inline weight="bold">
              Set this delay for
            </Text>
            <Flex gap={2}>
              <Box maxWidth={100}>
                <NumberField
                  id="delayInDelayType"
                  name="delayInDelayType"
                  onChange={({ event }) => formik.handleChange(event)}
                  onBlur={({ event }) => formik.handleBlur(event)}
                  value={formik.values.delayInDelayType}
                  autoComplete="off"
                  placeholder={
                    formik.values.delayType === DelayTypeEnum.Days
                      ? "enter days"
                      : formik.values.delayType === DelayTypeEnum.Hours
                      ? "enter hours"
                      : "enter minutes"
                  }
                  size="lg"
                />
              </Box>
              <SelectList
                id="delayType"
                size="lg"
                name="delayType"
                onChange={({ event }) => formik.handleChange(event)}
                value={formik.values.delayType}
              >
                {selectListOptions}
              </SelectList>
            </Flex>
            <Text>after the previous step</Text>
            <SlimBanner
              type="info"
              message={`Steps following this Time Delay occurs after ${formik.values.delayInDelayType} ${formik.values.delayType}.`}
              iconAccessibilityLabel="info"
            />
          </Flex>
        </Flex>
      </OverlayPanel>
    </Layer>
  );
}
