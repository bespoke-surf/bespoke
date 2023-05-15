import { useRouteLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { EventState, EventType } from "~/graphql/__generated__/graphql";
import type { RootData } from "~/root";

export interface MessageEventData {
  data: { message: string; state: EventState };
  id: string;
  type: EventType;
}

export default function useEventStream(
  href: string
): MessageEventData | undefined {
  const rootData = useRouteLoaderData("root") as RootData;

  let [data, setData] = useState<MessageEventData | undefined>();

  useEffect(() => {
    let eventSource = new EventSource(
      `${rootData?.BACKEND_HOST}/sse/${rootData?.subdomain}/${href}`
    );
    eventSource.addEventListener("message", handler);

    setData(undefined);

    function handler(event: MessageEvent) {
      setData(JSON.parse(event.data));
    }

    return () => {
      eventSource.removeEventListener("message", handler);
      eventSource.close();
    };
  }, [href, rootData?.BACKEND_HOST, rootData?.subdomain]);

  return data;
}
