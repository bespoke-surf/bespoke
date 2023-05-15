import { Box, Flex, Icon, Text } from "gestalt";
import { memo } from "react";
import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";

const TriggerDisabledNode = memo(({ isConnectable }: NodeProps) => {
  return (
    <Box
      opacity={0.4}
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
          background: "#bfc2c6",
          marginLeft: "-0.5rem",
        }}
        isConnectable={isConnectable}
      />

      <Flex direction="column" gap={2}>
        <Box marginStart={2}>
          <Flex justifyContent="between">
            <Text weight="bold" size="200">
              Do this...
            </Text>
            <Icon accessibilityLabel="lightning" icon="lightning-bolt-circle" />
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
          <Text weight="bold">Step</Text>
        </Box>
        <Box marginEnd={2}>
          <Text align="end" weight="bold" size="200">
            Then
          </Text>
        </Box>
      </Flex>
      <Handle
        type="source"
        position={Position.Right}
        style={{
          bottom: 0,
          top: "auto",
          width: 20,
          height: 20,
          background: "#bfc2c6",
          marginRight: "-0.5rem",
        }}
        isConnectable={isConnectable}
      />
    </Box>
  );
});

export default TriggerDisabledNode;
