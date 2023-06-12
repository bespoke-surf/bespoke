import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { BESPOKE_API_KEY } from '../utils/constants';

export const ApiKey = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKeyId = request.headers[BESPOKE_API_KEY] as string;
    return apiKeyId;
  },
);
