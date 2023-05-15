import type { SubscriberListFragment } from "~/graphql/__generated__/graphql";

export interface SubscriberListData {
  subscriberList: SubscriberListFragment[] | null | undefined;
  subscriberListCount: number | null | undefined;
}

export enum SubscriberListActionEnum {
  deleteSubscriberList = "deleteSubscriberList",
}
