import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../guard/authGuard';
import { HasStoreAccessWithAbout } from '../guard/hasStoreAccessWithAbout';
import { HasStoreAccessWithSubdomain } from '../guard/hasStoreAccessWithSubdomain';
import { About } from './about.entity';
import { AboutService } from './about.service';
import { UpdateAboutInput } from './dto/updateAboutInput';
import { AboutIndustryEnum } from './enum/industry.enum';

@Resolver(() => About)
export class AboutResolver {
  constructor(private readonly aboutService: AboutService) {}

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => About, {
    nullable: true,
    description: 'get about ',
  })
  async getAbout(@Args('subdomain') subdomain: string): Promise<About | null> {
    return this.aboutService.getAbout(subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithAbout)
  @Mutation(() => About, {
    nullable: true,
    description: 'update about',
  })
  async updateAbout(@Args('input') input: UpdateAboutInput): Promise<null> {
    return this.aboutService.updateAbout(input);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithAbout)
  @Mutation(() => About, {
    nullable: true,
    description: 'update industry',
  })
  async updateIndustry(
    @Args('aboutId') aboutId: string,
    @Args('industry', { type: () => AboutIndustryEnum })
    industry: AboutIndustryEnum,
  ): Promise<null> {
    return this.aboutService.updateIndustry(industry, aboutId);
  }
}
