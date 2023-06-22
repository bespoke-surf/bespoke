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
export class HasApiKeyAccessWithList implements CanActivate {
  constructor(
    @Inject(AuthorizationService)
    private authorizationService: AuthorizationService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const key = request.headers[BESPOKE_API_KEY.toLowerCase()] as string;
    if (!key) return false;

    const params = request.params;

    let listId = undefined;

    listId = Object.getOwnPropertyDescriptor(params, 'listId')
      ? params.listId
      : undefined;

    console.log({ listId }, 'top');

    if (!listId) {
      const body = request.body;
      console.log({ body });
      listId = body.data.listId ? body.data.listId : undefined;
    }
    console.log({ listId }, 'bottom');

    if (!listId) return false;

    const access = await this.authorizationService.hasApiKeyAccessWithList(
      key,
      listId,
    );

    if (access) return true;

    return false;
  }
}
