import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Controls,
  MiniMap,
} from "reactflow";
import TriggerNode from "./nodes/TriggerNode";

import type { Connection, EdgeTypes, Node, NodeMouseHandler } from "reactflow";
import { useEdgesState, useNodesState } from "reactflow";
import type { ModifiedNodeTypes } from "./types";
import { AutomationWorkflowIndexActionEnum } from "./types";

import { useRouteLoaderData, useSubmit, useTransition } from "@remix-run/react";

import gestaltDatePickerStyle from "gestalt-datepicker/dist/gestalt-datepicker.css";
import React, { useCallback, useContext, useEffect } from "react";
import {
  WorkflowActivityType,
  WorkflowNodeType,
} from "../../graphql/__generated__/graphql";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import type { AutomationWorkflowData } from "../automations.$workflowId/types";
import { action } from "./action";
import { loader } from "./loader";
import DelayNode from "./nodes/DelayNode";
import { NodeOptionContext } from "./nodes/NodeOptionProvider";
import SendEmailNode from "./nodes/SendEmailNode";
import TriggerDisabledNode from "./nodes/TriggerNodeDisabled";
import { NodeSheetContext } from "./sheets/NodeSheetProvider";
import TimeDelaySheet from "./sheets/TimeDelaySheet";
import TriggerSheet from "./sheets/TriggerSheet";
import { getLayoutedElements } from "./utils/getLayoutElements";

import type { LinksFunction } from "@remix-run/node";
import reactFlowStyle from "reactflow/dist/style.css";
import ButtonEdge from "./edge/ButtonEdge";
import style from "./index.css";
import ConditionalSplitNode from "./nodes/ConditionalSplitNode";
import TriggerSplitNode from "./nodes/TriggerSplitNode";
import ConditionalSplitSheet from "./sheets/ConditionalSplitSheet";
import SendEmailSheet from "./sheets/SendEmailSheet";
import { links as simpleEmailLink } from "./sheets/sendEmailSheet/SendEmailSimpleLayer";
import TriggerSplitSheet from "./sheets/TriggerSplitSheet";
import CustomConnectionLine from "./utils/CustomeConnectionLIne";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};
export { action, loader };

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: gestaltDatePickerStyle },
    { rel: "stylesheet", href: reactFlowStyle },
    { rel: "stylesheet", href: style },
    ...simpleEmailLink(),
  ];
};

const initialNodes: Node[] = [
  {
    id: WorkflowNodeType.TriggerNodeDisabled,
    type: WorkflowNodeType.TriggerNodeDisabled,
    data: {},
    position: { x: 250, y: 25 },
  },
];

const nodeTypes: ModifiedNodeTypes = {
  TriggerNode: TriggerNode,
  TriggerNodeDisabled: TriggerDisabledNode,
  DelayNode: DelayNode,
  SendEmailNode: SendEmailNode,
  ConditionalSplitNode: ConditionalSplitNode,
  TriggerSplitNode: TriggerSplitNode,
};

const edgeTypes: EdgeTypes = {
  ButtonEdge: ButtonEdge,
};

export default function WorflowIndex() {
  const automationWorkflowData = useRouteLoaderData(
    "routes/automations.$workflowId/index"
  ) as AutomationWorkflowData;
  const { state, update } = useContext(NodeSheetContext);
  const { state: nodeOptionState, update: nodeOptionUpdate } =
    useContext(NodeOptionContext);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const submit = useSubmit();
  const transition = useTransition();

  const loading =
    transition.state === "loading" || transition.state === "submitting";

  useEffect(() => {
    if (automationWorkflowData?.workflow?.node?.length === 0) {
      setNodes(initialNodes);
      update({
        data: { workflowActivityType: WorkflowActivityType.ListTrigger },
        state: "creating",
      });
    } else {
      if (
        automationWorkflowData?.workflow?.node !== undefined &&
        automationWorkflowData?.workflow?.node !== null &&
        automationWorkflowData?.workflow?.edge !== undefined &&
        automationWorkflowData?.workflow?.edge !== null
      ) {
        const { nodes, edges } = getLayoutedElements(
          automationWorkflowData?.workflow?.node,
          automationWorkflowData?.workflow?.edge
        );
        setNodes(nodes);
        setEdges(edges);
      }
    }
  }, [
    automationWorkflowData?.workflow?.edge,
    automationWorkflowData?.workflow?.node,
    automationWorkflowData?.workflow?.node?.length,
    setEdges,
    setNodes,
    update,
  ]);

  const handleNodeClick: NodeMouseHandler = useCallback(() => {
    if (automationWorkflowData?.workflow?.node?.length === 0) {
      update({
        data: { workflowActivityType: WorkflowActivityType.ListTrigger },
        state: "creating",
      });
    }
  }, [automationWorkflowData?.workflow?.node?.length, update]);

  const handleCloseSheets = useCallback(() => {
    update(null);
  }, [update]);

  const handlePaneClick = useCallback(() => {
    nodeOptionUpdate(null);
  }, [nodeOptionUpdate]);

  const handleOnMouseEnter = useCallback(
    (_: React.MouseEvent, node: Node) => {
      nodeOptionUpdate({
        nodeId: node.id,
        openSettings: true,
        openThenOptons:
          nodeOptionState?.nodeId == node.id
            ? nodeOptionState?.openThenOptons
            : false,
        openOtherWiseOptions:
          nodeOptionState?.nodeId == node.id
            ? nodeOptionState?.openOtherWiseOptions
            : false,
      });
    },
    [
      nodeOptionState?.nodeId,
      nodeOptionState?.openOtherWiseOptions,
      nodeOptionState?.openThenOptons,
      nodeOptionUpdate,
    ]
  );

  const handleOnMouseLeave = useCallback(
    (_: React.MouseEvent, node: Node) => {
      nodeOptionUpdate({
        nodeId: node.id,
        openSettings: false,
        openThenOptons:
          nodeOptionState?.nodeId == node.id
            ? nodeOptionState?.openThenOptons
            : false,
        openOtherWiseOptions:
          nodeOptionState?.nodeId == node.id
            ? nodeOptionState?.openOtherWiseOptions
            : false,
      });
    },
    [
      nodeOptionState?.nodeId,
      nodeOptionState?.openOtherWiseOptions,
      nodeOptionState?.openThenOptons,
      nodeOptionUpdate,
    ]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      if (loading) return;
      if (params.source && params.target) {
        setEdges((els) => addEdge(params, els));
        const formData = new FormData();
        formData.append(
          "_action",
          AutomationWorkflowIndexActionEnum.createNewConnection
        );
        formData.append("sourceId", params.source);
        formData.append("targetId", params.target);
        formData.append(
          "otherWise",
          params.sourceHandle === "b" ? "true" : "false"
        );
        submit(formData, { method: "post" });
      }
    },
    [submit, loading, setEdges]
  );

  if (state?.data?.workflowActivityType === WorkflowActivityType.SendEmail) {
    return <SendEmailSheet close={handleCloseSheets} />;
  }

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        fitView
        fitViewOptions={{ duration: 1200, padding: 0.3, maxZoom: 1 }}
        onPaneClick={handlePaneClick}
        onNodeMouseEnter={handleOnMouseEnter}
        onNodeMouseLeave={handleOnMouseLeave}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineComponent={CustomConnectionLine}
        attributionPosition="bottom-left"
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} color="rgb(135,135,135)" />
        <MiniMap nodeStrokeWidth={5} pannable zoomable />
      </ReactFlow>

      {state?.data?.workflowActivityType === WorkflowActivityType.ListTrigger ||
      state?.data?.workflowActivityType ===
        WorkflowActivityType.MetricTrigger ? (
        <TriggerSheet close={handleCloseSheets} />
      ) : null}
      {state?.data?.workflowActivityType === WorkflowActivityType.Delay && (
        <TimeDelaySheet close={handleCloseSheets} />
      )}
      {state?.data?.workflowActivityType ===
        WorkflowActivityType.ConditionalSplit && (
        <ConditionalSplitSheet close={handleCloseSheets} />
      )}
      {state?.data?.workflowActivityType ===
        WorkflowActivityType.TriggerSplit && (
        <TriggerSplitSheet close={handleCloseSheets} />
      )}
    </>
  );
}
