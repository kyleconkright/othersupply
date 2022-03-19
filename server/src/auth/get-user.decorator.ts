import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from './../user/entities/user.entity';

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
})

export const GqlUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);