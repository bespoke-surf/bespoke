import type { WorkflowFragment } from "../../graphql/__generated__/graphql";

export enum CommunityAutomationActionEnum {
  replicateWorkflow = "replicateWorkflow",
}

export const COMMUNITY_WAYPOINT_TRIGGER_AT = 5;

export interface CommunityLoaderData {
  workflows: WorkflowFragment[] | null | undefined;
}
