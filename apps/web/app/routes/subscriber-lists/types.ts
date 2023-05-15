import type { ListFragment } from "~/graphql/__generated__/graphql";

export interface ListData {
  lists: ListFragment[] | null | undefined;
}

export enum ListActionEnum {
  deleteList = "deleteList",
  toggleStarList = "toggleStarList",
}
