import type { NotificationFragment } from "../../graphql/__generated__/graphql";

export type NotificationData = {
  notification: NotificationFragment | null | undefined;
};

export enum NotificationActionEnum {
  newSubscriberNotificationToggle = "newSubscriberNotificationToggle",
}
