import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUser = createParamDecorator((data, context: ExecutionContext) => {
  const { user } = context.switchToHttp().getRequest();

  return user;
});
