import type { GetStarredListsQuery } from "../../graphql/__generated__/graphql";

export type DashboardLists = {
  lists: GetStarredListsQuery["getStarredLists"] | null | undefined;
};
