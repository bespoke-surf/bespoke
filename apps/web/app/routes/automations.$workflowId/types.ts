import { CompositeZIndex } from "gestalt";
import * as yup from "yup";
import type { WorkflowFragment } from "../../graphql/__generated__/graphql";
import { AutomationSheetZIndex } from "../automations.$workflowId.index/types";

export interface AutomationWorkflowData {
  workflow: WorkflowFragment | null | undefined;
}

export const AutomationWorkflowSchema = yup.object().shape({
  name: yup.string().required("workflow name is missing"),
});

export const WorkflowBarZIndex = new CompositeZIndex([AutomationSheetZIndex]);

export enum AutomationWorkflowActionEnum {
  turnOnWorkflow = "turnOnWorkflow",
  turnOffWorkflow = "turnOffWorkflow",
  updateWorkflowName = "updateWorkflowName",
}
