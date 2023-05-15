import { FixedZIndex } from "gestalt";
import type { ComponentType } from "react";
import type { NodeProps } from "reactflow";
import * as yup from "yup";
import type {
  BaseConditionalFilter,
  BaseTriggerFilter,
  IntegrationFragment,
  ItemFragment,
  ListFragment,
  StoreItemFragment,
  WorkflowNodeType,
} from "../../graphql/__generated__/graphql";

export const AutomationSheetZIndex = new FixedZIndex(10); //z-index value: 2

export interface FlowFilterFormikFormValues {
  flowFilter?: BaseConditionalFilter[][];
}
export interface TriggerFilterFormikFormValues {
  triggerFilter?: BaseTriggerFilter[][];
}

export declare type ModifiedNodeTypes = {
  [key in WorkflowNodeType]: ComponentType<NodeProps>;
};

export interface AutomationActionData {
  flushState: boolean;
}

export interface AutomationWorkflowIndexData {
  lists: ListFragment[] | null | undefined;
  integration: IntegrationFragment | null | undefined;
  emailTemplates: Array<StoreItemFragment & { item: ItemFragment }>;
}

export enum AutomationWorkflowIndexActionEnum {
  updateFlowFilter = "updateFlowFilter",
  updateSendEmailState = "updateSendEmailState",
  updateTriggerFilter = "updateTriggerFilter",
  createListTrigger = "createListTrigger",
  createMetricTrigger = "createMetricTrigger",
  updateListTrigger = "updateListTrigger",
  updateMetricTrigger = "updateMetricTrigger",
  createNewDalayNode = "createNewDelayNode",
  updateDelayState = "updateDelayState",
  deleteWorkflowNode = "deleteWorkflowNode",
  createNewConnection = "createNewConnection",
  createSendEmailNode = "createSendEmailNode",
  updateConditionalSplit = "updateConditionalSplit",
  createConditionalSplitNode = "createConditionalSplitNode",
  deleteWorkflowTransition = "deleteWorkflowTransition",
  createTriggerSplitNode = "createTriggerSplitNode",
  updateTriggerSplitState = "updateTriggerSplitState",
}

export interface NodeTypes {
  triggerNodeDisabled: JSX.Element;
  triggerNode: JSX.Element;
}

export const TriggerScheetSchema = yup.object().shape({
  listId: yup.string().required("please select a list"),
  metricType: yup.string().required("please choose a metric"),
});

export const DelaySheetSchema = yup.object().shape({
  delayType: yup.string().required("please select a duration type"),
  delayInDelayType: yup.number().required("please enter your duration"),
});

export const SendEmailSheetSchema = yup.object().shape({
  html: yup.string().required(""),
  design: yup.string().required(),
  name: yup.string().required("please enter a subject"),
});
