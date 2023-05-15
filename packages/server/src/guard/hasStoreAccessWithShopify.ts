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
export class HasStoreAccessWithShopify implements CanActivate {
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

    const shopifyId = Object.getOwnPropertyDescriptor(arguments_, 'shopifyId')
      ? arguments_.shopifyId
      : arguments_.input.shopifyId;

    const access = await this.authorizationService.hasStoreAccessWithShopify(
      userId,
      shopifyId,
    );

    if (access) return true;

    return false;
  }
}
