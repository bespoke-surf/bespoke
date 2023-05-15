import { createCtx } from "../../../utils/createCtx";

interface NodeOptionsState {
  nodeId: string;
  openThenOptons?: boolean;
  openOtherWiseOptions?: boolean;
  openSettings?: boolean;
  openDelete?: boolean;
}
const [ctx, Provider] = createCtx<NodeOptionsState>(null);

export const NodeOptionContext = ctx;
export const NodeOptionProvider = Provider;
