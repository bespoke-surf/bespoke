import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { createContext, useState } from "react";

export function createCtx<T>(defaultValue: T | null) {
  type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;

  const defaultUpdate: UpdateType = () => defaultValue;

  const ctx = createContext({
    state: defaultValue,
    update: defaultUpdate,
  });

  function Provider(props: PropsWithChildren<{}>) {
    const [state, update] = useState<T | null>(null);

    return <ctx.Provider value={{ state, update }} {...props} />;
  }
  return [ctx, Provider] as const; // alternatively, [typeof ctx, typeof Provider]
}
