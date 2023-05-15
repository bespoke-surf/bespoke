import { CompositeZIndex, FixedZIndex } from "gestalt";
import { createContext } from "react";

const HEADER_ZINDEX = new FixedZIndex(100);
export const MenuBarZIndex = new CompositeZIndex([HEADER_ZINDEX]);
export const TemplateZIndex = new CompositeZIndex([
  HEADER_ZINDEX,
  MenuBarZIndex,
]);

export interface EmailTemplateContext {
  setTemplateDesign: (arg: string) => void;
}

export const TemplateDesignContext = createContext<EmailTemplateContext | null>(
  null!
);
