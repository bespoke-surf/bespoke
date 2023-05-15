import type { GetAllListsOfASubscriberQuery } from "../../graphql/__generated__/graphql";

export type UnsubscriberData = {
  subscriberList:
    | GetAllListsOfASubscriberQuery["getAllListsOfASubscriber"]
    | null
    | undefined;
};

export enum UnsubscribeActionEnum {
  unsubscribeFromList = "unsubscribeFromList",
  resubscribeToLIst = "resubscribeToList",
  unsubscribeFromAllLIst = "unsubscribeFromAllList",
}
