import { Box, Flex, Icon, TapArea, Text } from "gestalt";
import { useCallback, useContext, useState } from "react";
import type { WorkflowNodeData } from "../../../../../graphql/__generated__/graphql";
import { WorkflowActivityType } from "../../../../../graphql/__generated__/graphql";
import { NodeSheetContext } from "../../../sheets/NodeSheetProvider";

export default function Logic({ data }: { data: WorkflowNodeData }) {
  const [logic, setLogic] = useState(false);

  const { state, update } = useContext(NodeSheetContext);

  const [delayColor, updateDelayColor] = useState(false);
  const [triggerHover, setTriggerHover] = useState(false);
  const [conditionalHover, setConditionalHover] = useState(false);

  const handleConditionalSplit = useCallback(() => {
    update({
      data: {
        ...data,
        workflowActivityType: WorkflowActivityType.ConditionalSplit,
        value: undefined,
      },
      state: "creating",
    });
  }, [data, update]);

  // const handleTriggerSplit = useCallback(() => {
  //   update({
  //     data: {
  //       ...data,
  //       workflowActivityType: WorkflowActivityType.TriggerSplit,
  //       value: undefined,
  //     },
  //     state: "creating",
  //   });
  // }, [data, update]);

  return (
    <Box position="relative">
      <TapArea
        onTap={() => {
          setLogic((s) => !s);
        }}
      >
        <Box
          borderStyle="shadow"
          paddingX={5}
          paddingY={3}
          rounding={1}
          onMouseEnter={() => updateDelayColor(true)}
          onMouseLeave={() => updateDelayColor(false)}
          color={delayColor || logic ? "dark" : "light"}
        >
          <Flex alignItems="center" direction="column" gap={2}>
            <Icon
              accessibilityLabel="clock"
              icon="lightbulb"
              size={20}
              color={delayColor || logic ? "light" : "dark"}
            />
            <Text color={delayColor || logic ? "light" : "dark"}>Logic</Text>
          </Flex>
        </Box>
      </TapArea>
      <Box position="absolute" display={logic ? "block" : "none"}>
        <Flex gap={2}>
          {/* <TapArea onTap={handleTriggerSplit}> */}
          <Box
            opacity={0.5}
            dangerouslySetInlineStyle={{ __style: { cursor: "not-allowed" } }}
            marginTop={2}
            borderStyle="shadow"
            paddingX={5}
            paddingY={3}
            rounding={1}
            onMouseEnter={() => setTriggerHover(true)}
            onMouseLeave={() => setTriggerHover(false)}
            color={triggerHover ? "dark" : "light"}
          >
            <Flex alignItems="center" direction="column" gap={2}>
              <Icon
                accessibilityLabel="clock"
                icon="flash"
                size={20}
                color={triggerHover ? "light" : "dark"}
              />
              <Text color={triggerHover ? "light" : "dark"}>Trigger Split</Text>
            </Flex>
          </Box>
          {/* </TapArea> */}
          <TapArea onTap={handleConditionalSplit}>
            <Box
              marginTop={2}
              borderStyle="shadow"
              paddingX={5}
              paddingY={3}
              rounding={1}
              onMouseEnter={() => setConditionalHover(true)}
              onMouseLeave={() => setConditionalHover(false)}
              color={
                conditionalHover ||
                state?.data?.workflowActivityType ===
                  WorkflowActivityType.ConditionalSplit
                  ? "dark"
                  : "light"
              }
            >
              <Flex alignItems="center" direction="column" gap={2}>
                <Icon
                  accessibilityLabel="clock"
                  icon="lightning-bolt-circle"
                  size={20}
                  color={
                    conditionalHover ||
                    state?.data?.workflowActivityType ===
                      WorkflowActivityType.ConditionalSplit
                      ? "light"
                      : "dark"
                  }
                />
                <Text
                  color={
                    conditionalHover ||
                    state?.data?.workflowActivityType ===
                      WorkflowActivityType.ConditionalSplit
                      ? "light"
                      : "dark"
                  }
                >
                  Conditional Split
                </Text>
              </Flex>
            </Box>
          </TapArea>
        </Flex>
      </Box>
    </Box>
  );
}
