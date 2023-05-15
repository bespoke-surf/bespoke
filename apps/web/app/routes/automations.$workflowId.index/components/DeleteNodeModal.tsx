import { useSubmit, useTransition } from "@remix-run/react";
import { Box, Button, Flex, Layer, Modal, Spinner, Text } from "gestalt";
import { useCallback } from "react";
import type { WorkflowNodeData } from "../../../graphql/__generated__/graphql";
import {
  AutomationSheetZIndex,
  AutomationWorkflowIndexActionEnum,
} from "../types";

export default function DeleteNodeModel({
  close,
  data,
}: {
  close: () => void;
  data: WorkflowNodeData;
}) {
  const submit = useSubmit();
  const transition = useTransition();

  const loading =
    transition.state === "loading" || transition.state === "submitting";

  const handleDelete = useCallback(() => {
    const formData = new FormData();
    formData.append(
      "_action",
      AutomationWorkflowIndexActionEnum.deleteWorkflowNode
    );
    formData.append("workflowStateId", data.id);
    submit(formData, { method: "post" });
  }, [data.id, submit]);

  return (
    <Layer zIndex={AutomationSheetZIndex}>
      <Modal
        accessibilityModalLabel="Delete this step"
        heading="Delete this step?"
        onDismiss={close}
        align="start"
        footer={
          <>
            {loading ? (
              <Flex
                alignItems="center"
                justifyContent="end"
                gap={{
                  row: 2,
                  column: 0,
                }}
              >
                <Spinner accessibilityLabel="loaidng" show />
              </Flex>
            ) : (
              <Flex
                alignItems="center"
                justifyContent="end"
                gap={{
                  row: 2,
                  column: 0,
                }}
              >
                <Button text="Cancel" onClick={close} />
                <Button color="red" text="Delete" onClick={handleDelete} />
              </Flex>
            )}
          </>
        }
        size="sm"
      >
        <Box paddingX={8}>
          <Text>Deleting this step cannot be undone</Text>
        </Box>
      </Modal>
    </Layer>
  );
}
