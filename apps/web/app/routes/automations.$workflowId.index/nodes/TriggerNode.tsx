import { useRouteLoaderData } from "@remix-run/react";
import { Box, Flex, Icon, IconButton, Text, Tooltip } from "gestalt";
import { memo, useCallback, useContext, useReducer } from "react";
import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import type { WorkflowNode } from "../../../graphql/__generated__/graphql";
import { WorkflowActivityType } from "../../../graphql/__generated__/graphql";
import type { AutomationWorkflowData } from "../../automations.$workflowId/types";
import { shopifyOptions } from "../metricTypes";
import NodeOptions from "./common/NodeOptions";
import NodeSettings from "./common/NodeSettings";
import TriggerDetails from "./common/TriggerDetails";
import { NodeOptionContext } from "./NodeOptionProvider";

const TriggerNode = memo(
  ({ data, isConnectable }: NodeProps<WorkflowNode["data"]>) => {
    const parentLoaderData = useRouteLoaderData(
      "routes/automations.$workflowId/index"
    ) as AutomationWorkflowData;

    const [openfilterDetails, toggleOpenfilterDetails] = useReducer(
      (s) => !s,
      true
    );

    const { state, update } = useContext(NodeOptionContext);

    const isCurrentNode = state?.nodeId === data.id;
    const isOptionOpen = isCurrentNode && state?.openThenOptons;
    const isSettingsOpen = isCurrentNode && state?.openSettings;

    const flowFilterExist =
      parentLoaderData?.workflow?.flowFilter?.length !== undefined &&
      parentLoaderData?.workflow?.flowFilter?.length > 0;
    const triggerFilterExist =
      parentLoaderData?.workflow?.triggerFilter?.length !== undefined &&
      parentLoaderData?.workflow?.triggerFilter?.length > 0;

    const handleOptionClick = useCallback(() => {
      if (isOptionOpen) {
        update(null);
      } else {
        update({
          nodeId: data.id,
          openThenOptons: true,
        });
      }
    }, [data.id, isOptionOpen, update]);

    return (
      <Box position="relative">
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              boxShadow:
                "0 0.125rem 0.0625rem rgba(0,0,0,.05),0 0 0.0625rem rgba(0,0,0,.25)",
              padding: 15,
              width: "16.25rem",
              borderRadius: 4,
              backgroundColor: "#FFFFFF",
              // border: `${isCurrentNode ? "1" : "0"}px solid #E60023`,
            },
          }}
        >
          <Flex direction="column" gap={3}>
            <Flex justifyContent="between" alignItems="center">
              <Text size="300" color="subtle">
                Trigger when someone{" "}
                {data.workflowActivityType ===
                WorkflowActivityType.MetricTrigger ? null : (
                  <Text inline weight="bold" color="subtle" size="300">
                    subscribes to
                  </Text>
                )}
              </Text>

              {data.workflowActivityType ===
              WorkflowActivityType.MetricTrigger ? (
                <Icon
                  accessibilityLabel="lightning"
                  icon="hand-pointing"
                  color="dark"
                  size={20}
                />
              ) : (
                <Icon
                  accessibilityLabel="lightning"
                  icon="person-add"
                  color="dark"
                  size={20}
                />
              )}
            </Flex>
            <Box
              dangerouslySetInlineStyle={{
                __style: {
                  backgroundColor: "#f6f6f7",
                },
              }}
              padding={2}
            >
              <Text weight="bold" size="400">
                {data.workflowActivityType ===
                WorkflowActivityType.MetricTrigger ? (
                  <>
                    {
                      shopifyOptions.find(({ value }) => value === data.name)
                        ?.label
                    }
                  </>
                ) : (
                  <>{data.name}</>
                )}
              </Text>
            </Box>
            <Box marginEnd={2}>
              <Flex
                direction="row"
                alignItems="center"
                justifyContent={
                  triggerFilterExist || flowFilterExist ? "between" : "end"
                }
              >
                {triggerFilterExist || flowFilterExist ? (
                  <Flex alignItems="center" gap={{ column: 0, row: 1 }}>
                    <Tooltip text="overview">
                      <IconButton
                        icon="overview"
                        accessibilityLabel="overview"
                        size="xs"
                        onClick={toggleOpenfilterDetails}
                        iconColor={openfilterDetails ? "white" : "darkGray"}
                        bgColor={openfilterDetails ? "darkGray" : "white"}
                      />
                    </Tooltip>
                    <Text size="100" color="subtle">
                      Filters (
                      {(parentLoaderData?.workflow?.flowFilter?.length ?? 0) +
                        (parentLoaderData?.workflow?.triggerFilter?.length ??
                          0)}
                      )
                    </Text>
                  </Flex>
                ) : null}
                <Text align="end" weight="bold" size="300" color="subtle">
                  Then
                </Text>
              </Flex>
            </Box>
          </Flex>

          <Handle
            type="source"
            id="a"
            position={Position.Right}
            onClick={handleOptionClick}
            style={{
              bottom: 12,
              top: "auto",
              width: 23,
              height: 23,
              background: "#E60023",
              marginRight: "-0.5rem",
              backgroundImage: "url('../plusIcon.svg')",
              backgroundPosition: "50%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "80%",
              cursor: "pointer",
              transform: `rotate(${isOptionOpen ? "45" : "90"}deg)`,
            }}
            isConnectable={isConnectable}
          />
        </Box>

        {(flowFilterExist || triggerFilterExist) && openfilterDetails && (
          <TriggerDetails data={data} />
        )}

        {isOptionOpen && <NodeOptions data={data} />}

        {isSettingsOpen && <NodeSettings data={data} />}
      </Box>
    );
  }
);

export default TriggerNode;
