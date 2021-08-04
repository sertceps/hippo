import { createParamDecorator } from '@nestjs/common';

export const AuthUser = createParamDecorator((data, req) => {
  // console.log(req.args[0].headers.authorization);
  return req.args[0].headers.authorization;
});
