import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { ApiKey } from '../../apiKey/apiKey.entity';
import { ApiKeyAccessScopeEnum } from '../../apiKey/enum/apikScopeEnum';
import { List } from '../../list/list.entity';
import { Subscriber } from '../../subscriber/subscriber.entity';
import { User } from '../../user/user.entity';

type Subjects =
  | InferSubjects<typeof List | typeof Subscriber | typeof User>
  | 'all';

export type AppAbility = PureAbility<[ApiKeyAccessScopeEnum, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForApi(apiKey: ApiKey | null) {
    const { can, cannot, build } = new AbilityBuilder<
      PureAbility<[ApiKeyAccessScopeEnum, Subjects]>
    >(PureAbility as AbilityClass<AppAbility>);

    if (apiKey?.scopes.includes(ApiKeyAccessScopeEnum.LIST_MANAGE)) {
      can(ApiKeyAccessScopeEnum.LIST_MANAGE, List);
      can(ApiKeyAccessScopeEnum.LIST_READ, List);
    }

    if (apiKey?.scopes.includes(ApiKeyAccessScopeEnum.LIST_READ)) {
      can(ApiKeyAccessScopeEnum.LIST_READ, List);
      cannot(ApiKeyAccessScopeEnum.LIST_MANAGE, List);
    }

    if (apiKey?.scopes.includes(ApiKeyAccessScopeEnum.SUBSCRIBER_MANAGE)) {
      can(ApiKeyAccessScopeEnum.SUBSCRIBER_MANAGE, Subscriber);
      can(ApiKeyAccessScopeEnum.SUBSCRIBER_READ, Subscriber);
    }

    if (apiKey?.scopes.includes(ApiKeyAccessScopeEnum.SUBSCRIBER_READ)) {
      can(ApiKeyAccessScopeEnum.SUBSCRIBER_READ, Subscriber);
      cannot(ApiKeyAccessScopeEnum.SUBSCRIBER_MANAGE, Subscriber);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
