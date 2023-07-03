import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUserId = createParamDecorator(
  (_: unknown, context: ExecutionContext) =>
    GqlExecutionContext.create(context).getContext().req.session.userId ??
    undefined,
);
