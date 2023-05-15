import { CompositeZIndex, FixedZIndex } from "gestalt";
import { AutomationSheetZIndex } from "../../automations.$workflowId.index/types";

const ziIndex = new FixedZIndex(1);
export const NewPostZIndex = new CompositeZIndex([ziIndex]);

const ziIndexDropDown = new FixedZIndex(2);
export const NewPostLayerZIndex = new CompositeZIndex([
  NewPostZIndex,
  ziIndexDropDown,
  AutomationSheetZIndex,
]);
