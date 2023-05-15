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
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthorizationService)
    private authorizationService: AuthorizationService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const myCtx: MyContext = ctx.getContext();
    const userId = myCtx.req.session.userId;

    if (!userId) return false;
    const user = await this.authorizationService.validUser(userId);
    if (!user) return false;
    return true;
  }
}
