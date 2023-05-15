import { Box, Datapoint, Flex } from "gestalt";
import { NodeToolbar, Position } from "reactflow";

export default function EmailMetricsDetails() {
  return (
    <NodeToolbar
      isVisible={true}
      position={Position.Left}
      style={{ top: "80px" }}
    >
      <Box color="default" padding={3}>
        <Flex justifyContent="between" direction="column" gap={2}>
          <Datapoint title="Delivered" value="-" />
          <Datapoint title="Open Rate" value="-" />
          <Datapoint title="Click Rate" value="-" />
        </Flex>
      </Box>
    </NodeToolbar>
  );
}
