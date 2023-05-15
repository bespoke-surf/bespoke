import dagre from "dagre";
import type { Edge, Node } from "reactflow";
import { MarkerType, Position } from "reactflow";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 360;
const nodeHeight = 238;

export const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  dagreGraph.setGraph({ rankdir: "LR" });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  edges.forEach((edge) => {
    const color = edge.sourceHandle === "a" ? "#E60023" : "black";
    edge.type = "ButtonEdge";
    edge.style = { stroke: color, strokeWidth: 3, borderRadius: 10 };
    edge.markerEnd = {
      type: MarkerType.Arrow,
      color,
      strokeWidth: 1,
    };
  });

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = Position.Left;
    node.sourcePosition = Position.Right;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};
