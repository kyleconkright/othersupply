import { createParamDecorator, ExecutionContext, Inject } from "@nestjs/common";
import { AuthService } from "./auth.service";


  export const CurrentUser = createParamDecorator(async (_data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const cookie = req.cookies[process.env.AUTH_COOKIE];
    return cookie;
  })
