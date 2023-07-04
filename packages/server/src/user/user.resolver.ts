import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUserId } from '../decorator/currentUserId';
import { AuthGuard } from '../guard/authGuard';
import { HasStoreAccess } from '../guard/hasStoreAccess';
import { HasStoreAccessWithShopify } from '../guard/hasStoreAccessWithShopify';
import { HasStoreAccessWithSubdomain } from '../guard/hasStoreAccessWithSubdomain';
import { Shopify } from '../shopify/shopify.entity';
import { Store } from '../store/store.entity';
import { AddCommaSeperatedEmailsToListInput } from '../subscriber-list/dto/addCommaSeperatedEmailsToList';
import { MyContext } from '../types';
import { CompleteOnboardingInput } from './dto/create-new-store-input';
import { CreateUserWithEmailInput } from './dto/createUserWithEmailInput.server';
import { EmailLoginInput } from './dto/emailLoginInput.server';
import { UploadCsvFileEmailsToListInput } from './dto/uploadCsvFile.intpu';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @ResolveField()
  async unlayerSignature(@Parent() user: User): Promise<string> {
    return this.userService.getUnlayerSignature(user);
  }

  @Query(() => Boolean, { description: 'check if user is onboarded' })
  getUserExistByEmail(@Args('email') email: string): Promise<boolean> {
    return this.userService.getUserExistByEmail(email);
  }

  @Query(() => User, { nullable: true })
  @UseGuards(AuthGuard)
  me(@CurrentUserId() userId: string) {
    return this.userService.me(userId);
  }

  @Mutation(() => User, {
    nullable: true,
    description: 'create user with email',
  })
  signupWithEmail(
    @Args('input')
    input: CreateUserWithEmailInput,
  ): Promise<User | null> {
    return this.userService.signupWithEmail(input, false);
  }

  @Mutation(() => User, {
    nullable: true,
    description: 'Login user',
  })
  emailLogin(@Args('input') input: EmailLoginInput): Promise<User | null> {
    return this.userService.emailLogin(input);
  }

  @Mutation(() => Boolean, {
    nullable: true,
    description: 'Login user',
  })
  confirmCodeAndLogin(
    @Args('loginCode') loginCode: string,
    @Context() context: MyContext,
  ): Promise<boolean> {
    return this.userService.confirmCodeAndLogin(loginCode, context);
  }

  @Mutation(() => Boolean, {
    nullable: true,
    description: 'Logout',
  })
  logout(@Context() context: MyContext): Promise<boolean> {
    return this.userService.logout(context);
  }

  @Mutation(() => Boolean, {
    nullable: true,
    description: 'update default listid ot collect email',
  })
  subscribeToStore(
    @Args('storeId')
    storeId: string,
    @Args('email')
    email: string,
  ): Promise<boolean> {
    return this.userService.subscribeToStore({
      storeId,
      email,
      list: 'default',
    });
  }

  @UseGuards(AuthGuard, HasStoreAccess)
  @Mutation(() => Boolean, {
    nullable: true,
    description: 'update multiple product images',
  })
  addCommaSeperatedEmailsToList(
    @Args('input', { type: () => AddCommaSeperatedEmailsToListInput })
    input: AddCommaSeperatedEmailsToListInput,
  ): Promise<boolean> {
    return this.userService.addCommaSeperatedEmailsToList(input);
  }

  @Mutation(() => Store, {
    nullable: true,
    description: 'create a new store',
  })
  @UseGuards(AuthGuard)
  completeOnboarding(
    @Args('input') input: CompleteOnboardingInput,
    @CurrentUserId() userId: string,
  ): Promise<Partial<Store> | null> {
    return this.userService.completeOnboarding(input, userId);
  }

  @Mutation(() => Shopify, {
    nullable: true,
    description: 'remove shopify integration',
  })
  @UseGuards(AuthGuard, HasStoreAccessWithShopify)
  syncShopifyCustomers(
    @Args('shopifyId')
    shopifyId: string,
  ): Promise<null> {
    return this.userService.syncShopifyCustomers(shopifyId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithShopify)
  @Mutation(() => Shopify, {
    nullable: true,
    description: 'add shopify integration',
  })
  stopShopifyCustomerSync(
    @Args('shopifyId')
    shopifyId: string,
  ): Promise<Shopify | null> {
    return this.userService.stopShopifyCustomerSync(shopifyId, true);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Mutation(() => String, {
    nullable: true,
    description: 'uplaod csv file emails to list',
  })
  uploadCsvFileEmailsToList(
    @Args('input')
    input: UploadCsvFileEmailsToListInput,
    @CurrentUserId() userId: string,
  ): Promise<null> {
    return this.userService.uploadCsvFileEmailsToList(input, userId);
  }
}
