import type { Maybe } from "graphql/jsutils/Maybe";
import type { WorkflowNodeData } from "../../../graphql/__generated__/graphql";
import { createCtx } from "../../../utils/createCtx";
interface NodeSheetState {
  data: Maybe<Partial<WorkflowNodeData>>;
  state: "creating" | "updating";
}

const [ctx, Provider] = createCtx<NodeSheetState>(null);

export const NodeSheetContext = ctx;
export const NodeSheetProvider = Provider;
