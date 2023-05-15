import { useRouteLoaderData } from "@remix-run/react";
import { Box, Flex, Icon, TapArea, Text } from "gestalt";
import { useCallback, useContext, useMemo, useState } from "react";
import { NodeToolbar, Position } from "reactflow";
import type { WorkflowNodeData } from "../../../../graphql/__generated__/graphql";
import { WorkflowActivityType } from "../../../../graphql/__generated__/graphql";
import type { AutomationWorkflowData } from "../../../automations.$workflowId/types";
import { NodeSheetContext } from "../../sheets/NodeSheetProvider";
import { NodeOptionContext } from "../NodeOptionProvider";
import Actions from "./nodeOptions/Actions";
import Logic from "./nodeOptions/Logic";

export default function NodeOptions({ data }: { data: WorkflowNodeData }) {
  const parentLoaderData = useRouteLoaderData(
    "routes/automations.$workflowId/index"
  ) as AutomationWorkflowData;

  const { state, update } = useContext(NodeSheetContext);
  const { state: optionState } = useContext(NodeOptionContext);

  const [delayColor, updateDelayColor] = useState(false);

  const flowOrTriggerFilter =
    parentLoaderData?.workflow?.flowFilter?.length !== undefined ||
    parentLoaderData?.workflow?.triggerFilter?.length !== undefined;

  const handleDelay = useCallback(() => {
    update({
      data: { ...data, workflowActivityType: WorkflowActivityType.Delay },
      state: "creating",
    });
  }, [data, update]);

  const nodeStyle = useMemo(() => {
    if (
      data?.workflowActivityType === WorkflowActivityType.ListTrigger ||
      data?.workflowActivityType === WorkflowActivityType.MetricTrigger
    ) {
      return flowOrTriggerFilter
        ? {
            top: "50px",
            left: "20px",
          }
        : {
            top: "45px",
            left: "20px",
          };
    }
    if (data.workflowActivityType === WorkflowActivityType.Delay) {
      return {
        top: "45px",
        left: "20px",
      };
    }
    if (data.workflowActivityType === WorkflowActivityType.SendEmail) {
      return {
        top: "61px",
        left: "20px",
      };
    }
    if (
      data.workflowActivityType === WorkflowActivityType.ConditionalSplit ||
      data.workflowActivityType === WorkflowActivityType.TriggerSplit
    ) {
      return optionState?.openThenOptons
        ? {
            top: "61px",
            left: "20px",
          }
        : {
            top: "21px",
            left: "20px",
          };
    }

    return undefined;
  }, [
    data.workflowActivityType,
    flowOrTriggerFilter,
    optionState?.openThenOptons,
  ]);

  return (
    <NodeToolbar
      isVisible
      position={Position.Right}
      offset={10}
      style={nodeStyle}
    >
      <Flex alignItems="center" gap={2}>
        <TapArea onTap={handleDelay}>
          <Box
            borderStyle="shadow"
            paddingX={5}
            paddingY={3}
            rounding={1}
            onMouseEnter={() => updateDelayColor(true)}
            onMouseLeave={() => updateDelayColor(false)}
            color={
              delayColor ||
              state?.data?.workflowActivityType === WorkflowActivityType.Delay
                ? "dark"
                : "light"
            }
          >
            <Flex alignItems="center" direction="column" gap={2}>
              <Icon
                accessibilityLabel="clock"
                icon="clock"
                size={20}
                color={
                  delayColor ||
                  state?.data?.workflowActivityType ===
                    WorkflowActivityType.Delay
                    ? "light"
                    : "dark"
                }
              />
              <Text
                color={
                  delayColor ||
                  state?.data?.workflowActivityType ===
                    WorkflowActivityType.Delay
                    ? "light"
                    : "dark"
                }
              >
                Delay
              </Text>
            </Flex>
          </Box>
        </TapArea>
        <Actions data={data} />
        <Logic data={data} />
      </Flex>
    </NodeToolbar>
  );
}
