import { Box, Flex, Icon, Text } from "gestalt";
import { useCallback, useContext } from "react";
import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import type { WorkflowNode } from "../../../graphql/__generated__/graphql";
import DeleteNodeModel from "../components/DeleteNodeModal";
import NodeOptions from "./common/NodeOptions";
import NodeSettings from "./common/NodeSettings";
import { NodeOptionContext } from "./NodeOptionProvider";

export default function SendEmailNode({
  data,
  isConnectable,
}: NodeProps<WorkflowNode["data"]>) {
  const { state, update } = useContext(NodeOptionContext);
  const isCurrentNode = state?.nodeId === data.id;
  const isOptionOpen = isCurrentNode && state?.openThenOptons;
  const isSettingsOpen = isCurrentNode && state?.openSettings;
  const isDeleteOpen = isCurrentNode && state?.openDelete;

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

  const handleDeleteClose = useCallback(() => {
    update({
      nodeId: data.id,
      openDelete: false,
      openThenOptons: state?.openThenOptons,
      openSettings: state?.openSettings,
    });
  }, [data.id, state?.openThenOptons, state?.openSettings, update]);

  return (
    <Box position="relative">
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            boxShadow:
              "0 0 0.25rem rgba(0,0,0,.1),0 0.5rem 2.5rem rgba(0,0,0,.2)",
            padding: 15,
            width: "16.25rem",
            borderRadius: 4,
            backgroundColor: "#FFFFFF",
          },
        }}
      >
        <Handle
          type="target"
          position={Position.Left}
          style={{
            bottom: "auto",
            top: 23,
            width: 20,
            height: 20,
            background: "#E60023",
            marginLeft: "-0.5rem",
          }}
          isConnectable={isConnectable}
        />

        <Flex direction="column" gap={2}>
          <Box marginStart={2}>
            <Flex justifyContent="between">
              <Text size="300" color="subtle">
                Send an email...
              </Text>
              <Icon
                accessibilityLabel="lightning"
                icon="envelope"
                color="dark"
                size={20}
              />
            </Flex>
          </Box>
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: "#f6f6f7",
              },
            }}
            padding={2}
          >
            <Text
              weight="bold"
              size="400"
              color={data.name === "Subject..." ? "subtle" : "dark"}
            >
              {data.name}
            </Text>
          </Box>

          <Box marginEnd={2}>
            <Flex justifyContent="end" alignItems="center">
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
      {/* <EmailMetricsDetails data={data} /> */}
      {isOptionOpen && <NodeOptions data={data} />}
      {isSettingsOpen && <NodeSettings data={data} />}
      {isDeleteOpen && (
        <DeleteNodeModel close={handleDeleteClose} data={data} />
      )}
    </Box>
  );
}
