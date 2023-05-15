import type { SubscriberFragment } from "~/graphql/__generated__/graphql";

export interface SubscribersSubscriberData {
  subscriber: SubscriberFragment | null | undefined;
  subscriberRevenue: number | null | undefined;
  formattedAddress: string | null | undefined;
}
