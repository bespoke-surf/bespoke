import { useEffect, useState } from "react";

export function useTimeoutTrigger(delay: number = 5000) {
  const [state, setState] = useState(false);

  useEffect(() => {
    if (state) {
      setTimeout(() => setState(false), delay);
    }
  }, [delay, state]);

  return { state, setState };
}
