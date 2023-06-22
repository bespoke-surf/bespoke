import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthorizationService } from '../../authorization/authorization.service';
import {
  AppAbility,
  CaslAbilityFactory,
} from '../../casl/casl-ability.factory/casl-ability.factory';
import {
  CHECK_POLICIES_KEY,
  PolicyHandler,
} from '../../decorator/checkPolicies';
import { BESPOKE_API_KEY } from '../../utils/constants';
@Injectable()
export class ApiPoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    @Inject(AuthorizationService)
    private authorizationService: AuthorizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const req = context.switchToHttp().getRequest<Request>();
    const apiKeyId = req.headers[BESPOKE_API_KEY.toLowerCase()] as string;
    const apiKey = await this.authorizationService.getApiKey(apiKeyId);
    const ability = this.caslAbilityFactory.createForApi(apiKey);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
