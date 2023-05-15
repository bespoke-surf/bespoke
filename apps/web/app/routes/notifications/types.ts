import type { EventFragment } from "../../graphql/__generated__/graphql";

export interface NotificationLoaderData {
  notification: EventFragment[] | null | null;
}

export enum NotificationActionEnum {
  dismissNotification = "dismaissNotification",
  setAllNotificationAsRead = "setAllNotificationAsRead",
}
