import type { ConnectionLineComponentProps } from "reactflow";
import { getBezierPath } from "reactflow";

const CustomConnectionLine = ({
  fromPosition,
  toX,
  fromX,
  fromY,
  toY,
  toPosition,
}: ConnectionLineComponentProps) => {
  const [edgePath] = getBezierPath({
    sourceX: fromX,
    sourceY: fromY,
    sourcePosition: fromPosition,
    targetX: toX,
    targetY: toY,
    targetPosition: toPosition,
  });
  return (
    <g>
      <path
        fill="none"
        stroke="#E60023"
        strokeWidth={1.5}
        className="animated"
        d={edgePath}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke="#E60023"
        strokeWidth={1.5}
      />
    </g>
  );
};

export default CustomConnectionLine;
