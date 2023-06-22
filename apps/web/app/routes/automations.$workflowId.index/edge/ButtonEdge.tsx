import { Form } from "@remix-run/react";
import { Box, IconButton } from "gestalt";
import type { EdgeProps } from "reactflow";
import { getSmoothStepPath } from "reactflow";
import { AutomationWorkflowIndexActionEnum } from "../types";

const foreignObjectSize = 25;

export default function ButtonEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  style,
  sourceHandleId,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={style}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={labelX - foreignObjectSize / 2}
        y={labelY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <Box>
          <Form method="post">
            <input
              type="hidden"
              value={AutomationWorkflowIndexActionEnum.deleteWorkflowTransition}
              name="_action"
            />
            <input type="hidden" value={id} name="workflowTransitionId" />
            <input
              type="hidden"
              value={sourceHandleId === "b" ? "true" : "false"}
              name="otherWise"
            />
            <IconButton
              icon="cancel"
              accessibilityLabel="cancel"
              size="xs"
              bgColor="white"
              type="submit"
              role="button"
            />
          </Form>
        </Box>
      </foreignObject>
    </>
  );
}
