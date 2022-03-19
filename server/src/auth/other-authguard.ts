import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class OtherAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const cookie = req.cookies[process.env.AUTH_COOKIE];
    const data = await this.authService.verify(cookie);
    const user = await this.authService.getUser(data.username);
    return !!user
  }
  // getUser(ctx: ExecutionContext) {
  //   console.log(req.cookies);
  //   return true;
  // }
}