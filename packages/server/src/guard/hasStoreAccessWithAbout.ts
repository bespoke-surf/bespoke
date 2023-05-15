import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthorizationService } from '../authorization/authorization.service';
import { MyContext } from '../types';

@Injectable()
export class HasStoreAccessWithAbout implements CanActivate {
  constructor(
    @Inject(AuthorizationService)
    private authorizationService: AuthorizationService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const context_ = GqlExecutionContext.create(context);
    const myContext: MyContext = context_.getContext();

    const userId = myContext.req.session.userId;
    if (!userId) return false;

    const arguments_ = context_.getArgs();

    const aboutId = Object.getOwnPropertyDescriptor(arguments_, 'aboutId')
      ? arguments_.aboutId
      : arguments_.input.aboutId;

    const access = await this.authorizationService.hasStoreAccessWithAbout(
      userId,
      aboutId,
    );

    if (access) return true;

    return false;
  }
}
