import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthorizationService } from '../../authorization/authorization.service';
import { BESPOKE_API_KEY } from '../../utils/constants';

@Injectable()
export class HasApiKeyAccessWithSubscriber implements CanActivate {
  constructor(
    @Inject(AuthorizationService)
    private authorizationService: AuthorizationService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const key = request.headers[BESPOKE_API_KEY.toLowerCase()] as string;
    if (!key) return false;

    const params = request.params;

    let subscriberId = undefined;

    subscriberId = Object.getOwnPropertyDescriptor(params, 'subscriberId')
      ? params.subscriberId
      : undefined;

    console.log({ subscriberId }, 'top');
    if (!subscriberId) {
      const body = request.body;
      console.log({ body });
      subscriberId = body.data.subscriberId
        ? body.data.subscriberId
        : undefined;
    }

    console.log({ subscriberId }, 'bottom');
    if (!subscriberId) return false;

    const access =
      await this.authorizationService.hasApiKeyAccessWithSubscriber(
        key,
        subscriberId,
      );

    if (access) return true;

    return false;
  }
}
