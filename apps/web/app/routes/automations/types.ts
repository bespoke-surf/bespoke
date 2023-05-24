import * as yup from "yup";
import type {
  BillingFragment,
  WorkflowFragment,
} from "../../graphql/__generated__/graphql";
export interface AutomationData {
  workflows: WorkflowFragment[] | null | undefined;
  billing: BillingFragment | null | undefined;
}

export enum AutomationActionEnum {
  turnOffWorkflow = "turnOffWorkflow",
  turnOnWorkflow = "turnOnWorkflow",
  deleteWorkflow = "deleteWorkflow",
  createWorkflow = "createWorkflow",
  convertWorkflowToPublic = "convertWorkflowToPublic",
  updateDescription = "updateDescription",
}

export const DescriptionSchema = yup.object().shape({
  descriptionHTML: yup.string().required("please add a description"),
  descriptionLexical: yup.string().required("please add a description"),
  workflowId: yup.string().required(),
});
