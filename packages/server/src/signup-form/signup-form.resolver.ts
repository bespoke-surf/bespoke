import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { AuthGuard } from '../guard/authGuard';
import { HasStoreAccess } from '../guard/hasStoreAccess';
import { HasStoreAccessWithSignupForm } from '../guard/hasStoreAccessWithSignupForm';
import { HasStoreAccessWithSubdomain } from '../guard/hasStoreAccessWithSubdomain';
import { AddSignupFormItem } from './dto/addSignupFormItem';
import { UpdateSignupformInput } from './dto/updateSignupFormInput';
import { SignupForm } from './signup-form.entity';
import { SignupFormService } from './signup-form.service';

@Resolver(() => SignupForm)
export class SignupFormResolver {
  constructor(private signupFormService: SignupFormService) {}

  @ResolveField()
  formSubmitRate(@Root() signupForm: SignupForm): Promise<number> {
    return this.signupFormService.getFormSubmitRate(signupForm);
  }

  @ResolveField(() => Int)
  views(@Root() signupForm: SignupForm): Promise<number> {
    return this.signupFormService.getFormViewedCount(signupForm);
  }

  @ResolveField(() => Int)
  submitted(@Root() signupForm: SignupForm): Promise<number> {
    return this.signupFormService.getFormSubmittedCount(signupForm);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => [SignupForm], {
    nullable: true,
    description: 'check user onboarded',
  })
  getSignupForms(
    @Args('subdomain') subdomain: string,
  ): Promise<SignupForm[] | null> {
    return this.signupFormService.getSignupForms(subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSignupForm)
  @Query(() => SignupForm, {
    nullable: true,
    description: 'check user onboarded',
  })
  getSignupForm(@Args('signupFormId') id: string): Promise<SignupForm | null> {
    return this.signupFormService.getSignupForm(id);
  }

  @UseGuards(AuthGuard)
  @Query(() => [SignupForm], {
    nullable: true,
    description: 'get signupforms with storeid',
  })
  getSignupFormsWithStoreId(
    @Args('storeId') storeId: string,
  ): Promise<SignupForm[] | null> {
    return this.signupFormService.getSignupFormsWithStoreId(storeId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSignupForm)
  @Mutation(() => SignupForm, {
    nullable: true,
    description: 'check user onboarded',
  })
  deleteSignupForm(@Args('signupFormId') signupFormId: string): Promise<null> {
    return this.signupFormService.deleteSignupForm(signupFormId);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSignupForm)
  @Mutation(() => SignupForm, {
    nullable: true,
    description: 'update signup form',
  })
  updateSignupForm(
    @Args('input', { type: () => UpdateSignupformInput })
    input: UpdateSignupformInput,
  ): Promise<null> {
    return this.signupFormService.updateSignupForms(input);
  }

  @UseGuards(AuthGuard, HasStoreAccess)
  @Mutation(() => SignupForm, {
    nullable: true,
    description: 'add signup form item',
  })
  addSignupFormItem(
    @Args('input') input: AddSignupFormItem,
  ): Promise<SignupForm | null> {
    return this.signupFormService.addSignupFormItem(input);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => Int, {
    description: 'get total submitted form',
  })
  getTotalSubmittedForm(@Args('subdomain') subdomain: string): Promise<number> {
    return this.signupFormService.getTotalSubmittedForm(subdomain);
  }

  @UseGuards(AuthGuard, HasStoreAccessWithSubdomain)
  @Query(() => Int, {
    description: 'get total submitted form',
  })
  getTotalFormSubmitRate(
    @Args('subdomain') subdomain: string,
  ): Promise<number> {
    return this.signupFormService.getTotalFormSubmitRate(subdomain);
  }
}
