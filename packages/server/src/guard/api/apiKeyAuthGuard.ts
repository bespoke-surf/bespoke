import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthorizationService } from '../../authorization/authorization.service';
import { MyContext } from '../../types';
import { BESPOKE_API_KEY } from '../../utils/constants';

@Injectable()
export class ApiKeyAuthGurad implements CanActivate {
  constructor(
    @Inject(AuthorizationService)
    private authorizationService: AuthorizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const context_ = GqlExecutionContext.create(context);
    const myContext: MyContext = context_.getContext();
    const key = BESPOKE_API_KEY.toLowerCase();
    const apiKeyId = myContext.req.headers[key] as string;
    if (!apiKeyId) return false;

    const access = await this.authorizationService.hasApiKeyAccess(apiKeyId);

    if (access) return true;

    return false;
  }
}
