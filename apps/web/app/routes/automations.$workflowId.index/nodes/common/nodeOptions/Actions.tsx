import { Box, Flex, Icon, TapArea, Text } from "gestalt";
import { useCallback, useContext, useState } from "react";
import type { WorkflowNodeData } from "../../../../../graphql/__generated__/graphql";
import { WorkflowActivityType } from "../../../../../graphql/__generated__/graphql";
import { NodeSheetContext } from "../../../sheets/NodeSheetProvider";

export default function Actions({ data }: { data: WorkflowNodeData }) {
  const [email, setEmail] = useState(false);
  const [delayColor, updateDelayColor] = useState(false);
  const [emailHover, setEmailHover] = useState(false);
  const [emailSimpleHover, setEmailSimpleHover] = useState(false);

  const { update } = useContext(NodeSheetContext);

  const handleCreateSendEmail = useCallback(
    (type: "simple" | "complex") => {
      update({
        data: {
          ...data,
          name: undefined,
          workflowActivityType: WorkflowActivityType.SendEmail,
          value: {
            __typename: "WorkflowStateSendEmailActivityValue",
            type,
            design: "",
            html: "",
          },
        },
        state: "creating",
      });
    },
    [data, update]
  );

  return (
    <Box position="relative">
      <TapArea
        onTap={() => {
          setEmail((s) => !s);
        }}
      >
        <Box
          borderStyle="shadow"
          paddingX={5}
          paddingY={3}
          rounding={1}
          onMouseEnter={() => updateDelayColor(true)}
          onMouseLeave={() => updateDelayColor(false)}
          color={delayColor || email ? "dark" : "light"}
        >
          <Flex alignItems="center" direction="column" gap={2}>
            <Icon
              accessibilityLabel="clock"
              icon="send"
              size={20}
              color={delayColor || email ? "light" : "dark"}
            />
            <Text color={delayColor || email ? "light" : "dark"}>Actions</Text>
          </Flex>
        </Box>
      </TapArea>
      <Box position="absolute" display={email ? "block" : "none"}>
        <Flex gap={2}>
          <TapArea onTap={() => handleCreateSendEmail("complex")}>
            <Box
              marginTop={2}
              borderStyle="shadow"
              paddingX={5}
              paddingY={3}
              rounding={1}
              onMouseEnter={() => setEmailHover(true)}
              onMouseLeave={() => setEmailHover(false)}
              color={emailHover ? "dark" : "light"}
            >
              <Flex alignItems="center" direction="column" gap={2}>
                <Icon
                  color={emailHover ? "light" : "dark"}
                  accessibilityLabel="clock"
                  icon="envelope"
                  size={20}
                />
                <Box>
                  <Text align="center" color={emailHover ? "light" : "dark"}>
                    Email
                  </Text>
                  <Text align="center" color={emailHover ? "light" : "dark"}>
                    (complex)
                  </Text>
                </Box>
              </Flex>
            </Box>
          </TapArea>
          <TapArea onTap={() => handleCreateSendEmail("simple")}>
            <Box
              marginTop={2}
              borderStyle="shadow"
              paddingX={5}
              paddingY={3}
              rounding={1}
              onMouseEnter={() => setEmailSimpleHover(true)}
              onMouseLeave={() => setEmailSimpleHover(false)}
              color={emailSimpleHover ? "dark" : "light"}
            >
              <Flex alignItems="center" direction="column" gap={2}>
                <Icon
                  color={emailSimpleHover ? "light" : "dark"}
                  accessibilityLabel="clock"
                  icon="envelope"
                  size={20}
                />
                <Box>
                  <Text
                    align="center"
                    color={emailSimpleHover ? "light" : "dark"}
                  >
                    Email
                  </Text>
                  <Text
                    align="center"
                    color={emailSimpleHover ? "light" : "dark"}
                  >
                    (simple)
                  </Text>
                </Box>
              </Flex>
            </Box>
          </TapArea>
        </Flex>
      </Box>
    </Box>
  );
}
