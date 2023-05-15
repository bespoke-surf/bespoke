import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../guard/authGuard';
import { HasStoreAccessWithSubdomain } from '../guard/hasStoreAccessWithSubdomain';
import { Integration } from './integration.entity';
import { IntegrationService } from './integration.service';

@Resolver()
export class IntegrationResolver {
  constructor(private integrationService: IntegrationService) {}

  @Query(() => Integration, {
    nullable: true,
    description: 'get integration with subdomain',
  })
  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  getIntegrationWithSubdomain(
    @Args('subdomain') subdomain: string,
  ): Promise<Integration | null> {
    return this.integrationService.getIntegrationWithSubdomain(subdomain);
  }
}
