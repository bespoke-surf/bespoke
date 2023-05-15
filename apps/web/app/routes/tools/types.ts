import type {
  GetListCountQuery,
  GetPostCountQuery,
  GetSubscribersCountQuery,
  GetTotalFormSubmitRateQuery,
  GetTotalSubmittedFormQuery,
  GetWorkflowCountQuery,
} from "../../graphql/__generated__/graphql";

export interface ToolsLoaderData {
  workflowCountPromise: Promise<GetWorkflowCountQuery>;
  submittedFormPromise: Promise<GetTotalSubmittedFormQuery>;
  formSubmitRatePromise: Promise<GetTotalFormSubmitRateQuery>;
  postCountPromise: Promise<GetPostCountQuery>;
  subscriberCountPromise: Promise<GetSubscribersCountQuery>;
  listCountPromise: Promise<GetListCountQuery>;
}
