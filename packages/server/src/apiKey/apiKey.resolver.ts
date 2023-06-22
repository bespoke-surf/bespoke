import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HasStoreAccessWithApiKey } from '../guard/api/hasStoreAccessWithApiKey';
import { AuthGuard } from '../guard/authGuard';
import { HasStoreAccess } from '../guard/hasStoreAccess';
import { HasStoreAccessWithSubdomain } from '../guard/hasStoreAccessWithSubdomain';
import { ApiKey } from './apiKey.entity';
import { ApiKeyService } from './apiKey.service';
import { ApiAccessLevel } from './enum/apiAccessLevel';
import { ApiKeyAccessScopeEnum } from './enum/apikScopeEnum';

@Resolver(() => ApiKey)
export class ApiKeyResolver {
  constructor(private apiKeyService: ApiKeyService) {}

  @UseGuards(AuthGuard, HasStoreAccess)
  @Mutation(() => ApiKey, {
    nullable: true,
  })
  async createApiKey(
    @Args('storeId') storeId: string,
    @Args('name') name: string,
    @Args('accessLevel', { type: () => ApiAccessLevel })
    accessLevel: ApiAccessLevel,
    @Args('scopes', { type: () => [ApiKeyAccessScopeEnum], nullable: true })
    scopes?: ApiKeyAccessScopeEnum[],
  ): Promise<null> {
    return this.apiKeyService.createApiKey(storeId, name, accessLevel, scopes);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => [ApiKey], {
    nullable: true,
  })
  async getApiKeys(@Args('subdomain') subdomain: string): Promise<ApiKey[]> {
    return this.apiKeyService.getApiKeys(subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithApiKey)
  @Mutation(() => String, {
    nullable: true,
  })
  async deleteApiKey(@Args('apiKeyId') id: string): Promise<null> {
    return this.apiKeyService.deleteApiKey(id);
  }
}
