import { Box, Flex, Icon, TapArea, Text } from "gestalt";
import { useCallback, useContext, useState } from "react";
import { NodeToolbar, Position } from "reactflow";
import type { WorkflowNodeData } from "../../../../graphql/__generated__/graphql";
import { WorkflowActivityType } from "../../../../graphql/__generated__/graphql";
import { NodeSheetContext } from "../../sheets/NodeSheetProvider";
import { NodeOptionContext } from "../NodeOptionProvider";

export default function NodeSettings({ data }: { data: WorkflowNodeData }) {
  const { update } = useContext(NodeSheetContext);
  const { state: nodeOptionState, update: nodeOptionUpdate } =
    useContext(NodeOptionContext);

  const [updateColor, setUpdateColor] = useState(false);
  const [deleteColor, setDeleteColor] = useState(false);

  const handleOpenUpdate = useCallback(() => {
    update({
      data,
      state: "updating",
    });
  }, [data, update]);

  const handleOpenDelete = useCallback(() => {
    nodeOptionUpdate({
      nodeId: data.id,
      openDelete: true,
      openThenOptons: nodeOptionState?.openThenOptons,
      openSettings: nodeOptionState?.openSettings,
    });
  }, [
    data.id,
    nodeOptionState?.openThenOptons,
    nodeOptionState?.openSettings,
    nodeOptionUpdate,
  ]);

  return (
    <NodeToolbar position={Position.Bottom} isVisible offset={5}>
      <Box>
        <Flex direction="row" gap={2}>
          <TapArea onTap={handleOpenUpdate}>
            <Box
              color={updateColor ? "dark" : "light"}
              borderStyle="shadow"
              paddingX={5}
              paddingY={3}
              rounding={1}
              onMouseEnter={() => setUpdateColor(true)}
              onMouseLeave={() => setUpdateColor(false)}
            >
              <Flex alignItems="center" direction="column" gap={2}>
                <Icon
                  accessibilityLabel="clock"
                  color={updateColor ? "light" : "dark"}
                  icon="replace"
                  size={20}
                />
                <Text color={updateColor ? "light" : "dark"}>Update</Text>
              </Flex>
            </Box>
          </TapArea>
          {data.workflowActivityType === WorkflowActivityType.ListTrigger ||
          data.workflowActivityType ===
            WorkflowActivityType.MetricTrigger ? null : (
            <TapArea onTap={handleOpenDelete}>
              <Box
                color={deleteColor ? "dark" : "light"}
                borderStyle="shadow"
                paddingX={5}
                paddingY={3}
                rounding={1}
                onMouseEnter={() => setDeleteColor(true)}
                onMouseLeave={() => setDeleteColor(false)}
              >
                <Flex alignItems="center" direction="column" gap={2}>
                  <Icon
                    color={deleteColor ? "light" : "dark"}
                    accessibilityLabel="clock"
                    icon="trash-can"
                    size={20}
                  />
                  <Text color={deleteColor ? "light" : "dark"}>Delete</Text>
                </Flex>
              </Box>
            </TapArea>
          )}
        </Flex>
      </Box>
    </NodeToolbar>
  );
}
