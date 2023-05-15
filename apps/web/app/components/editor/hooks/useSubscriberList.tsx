import { useFetcher } from "@remix-run/react";
import type { ComboBoxItemType } from "gestalt";
import { useEffect, useState } from "react";
import type { ListData } from "../../../routes/subscriber-lists/types";

export const useSubscriberList = (): {
  options: ComboBoxItemType[];
} => {
  const fetcher = useFetcher<ListData>();
  const [options, setOptions] = useState<ComboBoxItemType[]>([]);

  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load("/subscriber-lists");
    }
  }, [fetcher]);

  useEffect(() => {
    if (fetcher.data?.lists) {
      const op: ComboBoxItemType[] = fetcher.data.lists?.map((list) => ({
        label: list.name,
        value: list.id,
      }));
      // op.push({
      //   label: "Create a new list",
      //   value: "create-list",
      //   subtext: "navigates to Lists",
      // });
      setOptions(op);
    }
  }, [fetcher.data?.lists]);

  return { options };
};
