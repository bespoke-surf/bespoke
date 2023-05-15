import { useRouteLoaderData } from "@remix-run/react";
import { Box, Flex, Text } from "gestalt";
import type { WorkflowNodeData } from "../../../../graphql/__generated__/graphql";
import { WorkflowActivityType } from "../../../../graphql/__generated__/graphql";

import type { AutomationWorkflowData } from "../../../automations.$workflowId/types";
import { shopifyOptions } from "../../metricTypes";
import { FlowFilterDetails } from "./triggerDetails/FlowFilterDetails";
import { TriggerFilterDetails } from "./triggerDetails/TriggerFilterDetails";

export default function TriggerDetails({ data }: { data: WorkflowNodeData }) {
  const parentLoaderData = useRouteLoaderData(
    "routes/automations.$workflowId/index"
  ) as AutomationWorkflowData;

  return (
    <Box
      left={true}
      maxWidth={300}
      padding={5}
      position="absolute"
      top
      dangerouslySetInlineStyle={{ __style: { left: "-288px", top: "-20px" } }}
    >
      <Flex alignItems="center" gap={2}>
        <Box
          color="infoWeak"
          borderStyle="shadow"
          paddingX={5}
          paddingY={3}
          rounding={2}
        >
          <Flex direction="column" gap={{ column: 6, row: 0 }}>
            <Flex direction="column" gap={{ column: 2, row: 0 }}>
              <Text color="subtle" size="100" weight="bold">
                TRIGGER
              </Text>
              <Box>
                <Text inline size="300">
                  People will enter this flow when they{" "}
                </Text>
                <Text inline weight="bold" size="300">
                  {data.workflowActivityType ===
                  WorkflowActivityType.MetricTrigger ? (
                    <>
                      {
                        shopifyOptions.find(({ value }) => value === data.name)
                          ?.label
                      }
                    </>
                  ) : (
                    <>subscribe to {data.name}</>
                  )}
                </Text>
              </Box>
            </Flex>
            {parentLoaderData?.workflow?.triggerFilter?.length !== undefined &&
            parentLoaderData.workflow?.triggerFilter?.length > 0 ? (
              <>
                <Flex direction="column" gap={{ column: 2, row: 0 }}>
                  <Text color="subtle" size="200" weight="bold">
                    TRIGGER FILTERS (
                    {parentLoaderData.workflow.triggerFilter?.length})
                  </Text>
                  {parentLoaderData.workflow.triggerFilter?.map(
                    (triggerFilter, parentIndex) =>
                      triggerFilter.map((filter, index) => (
                        <Box key={filter.dimension ?? "" + index}>
                          {parentIndex !== 0 && (
                            <Box marginBottom={2}>
                              <Flex alignItems="center">
                                <Box marginEnd={1}>
                                  <Text color="subtle" size="100">
                                    And
                                  </Text>
                                </Box>
                                <Box
                                  height="0.1px"
                                  dangerouslySetInlineStyle={{
                                    __style: {
                                      borderTop: "0.1px solid #767676",
                                    },
                                  }}
                                  width="100%"
                                />
                                <hr />
                              </Flex>
                            </Box>
                          )}
                          {index !== 0 && (
                            <Box marginBottom={1} marginTop={-1}>
                              <Text size="100" color="subtle">
                                OR
                              </Text>
                            </Box>
                          )}
                          <TriggerFilterDetails filter={filter} />
                        </Box>
                      ))
                  )}
                </Flex>
              </>
            ) : null}
            {parentLoaderData?.workflow?.flowFilter?.length !== undefined &&
            parentLoaderData.workflow?.flowFilter?.length > 0 ? (
              <>
                <Flex direction="column" gap={{ column: 2, row: 0 }}>
                  <Text color="subtle" size="200" weight="bold">
                    FLOW FILTERS ({parentLoaderData.workflow.flowFilter?.length}
                    )
                  </Text>
                  {parentLoaderData.workflow.flowFilter.map(
                    (flowfilter, parentIndex) =>
                      flowfilter.map((filter, index) => (
                        <Box key={filter.condition ?? "" + index}>
                          {parentIndex !== 0 && (
                            <Box marginBottom={2}>
                              <Flex alignItems="center">
                                <Box marginEnd={1}>
                                  <Text color="subtle" size="100">
                                    And
                                  </Text>
                                </Box>
                                <Box
                                  height="0.1px"
                                  dangerouslySetInlineStyle={{
                                    __style: {
                                      borderTop: "0.1px solid #767676",
                                    },
                                  }}
                                  width="100%"
                                />
                                <hr />
                              </Flex>
                            </Box>
                          )}
                          {index !== 0 && (
                            <Box marginBottom={1} marginTop={-1}>
                              <Text size="100" color="subtle">
                                OR
                              </Text>
                            </Box>
                          )}

                          <FlowFilterDetails filter={filter} />
                        </Box>
                      ))
                  )}
                </Flex>
              </>
            ) : null}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
