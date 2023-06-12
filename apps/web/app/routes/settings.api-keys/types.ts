import type { ApiKeyFragment } from "../../graphql/__generated__/graphql";

export type ApiKeysData = {
  apiKeys: ApiKeyFragment[];
};

export enum ApiKeyActionEnum {
  creatApiKey = "createApiKey",
  deleteApiKye = "deleteApiKey",
}
