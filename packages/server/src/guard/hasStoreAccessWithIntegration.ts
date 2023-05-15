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
export class HasStoreAccessWithIntegration implements CanActivate {
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

    const integrationId = Object.getOwnPropertyDescriptor(
      arguments_,
      'integrationId',
    )
      ? arguments_.integrationId
      : arguments_.input.integrationId;

    const access =
      await this.authorizationService.hasStoreAccessWithIntegration(
        userId,
        integrationId,
      );

    if (access) return true;

    return false;
  }
}
