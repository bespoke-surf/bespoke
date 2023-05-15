import type { SubscriberFragment } from "~/graphql/__generated__/graphql";

export interface SubscribersData {
  subscribers: SubscriberFragment[] | null | undefined;
  subscribersCount: number | null | undefined;
}

export interface SubscribersActionData {
  searchedSubscribers: SubscriberFragment[] | null | undefined;
}

export enum SubscribersActionEnum {
  searchForSubscribers = "searchForSubscribers",
}
