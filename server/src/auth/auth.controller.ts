import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @Post('login')
  async login(
    @Body() createUserInput: CreateUserInput,
    @Res({passthrough: true}) res: Response,
  ): Promise<Record<string, string>> {
    try {
      const jwt = await this.authService.loginUser(createUserInput);
      res.cookie(process.env.AUTH_COOKIE, jwt.accessToken, {httpOnly: true})
      return {
        message: "success"
      }
    } catch {
      throw new UnauthorizedException('Check Credentials')
    }
  }

  @Post('create')
  createUser(
    @Body() createUserInput: CreateUserInput,
  ): Promise<{}> {
    return this.authService.createUser(createUserInput);
  }

  @Post('logout')
  logout(@Res({passthrough: true}) res: Response) {
    res.clearCookie(process.env.AUTH_COOKIE);
    return {message: 'logged out'};
  }

  @UseGuards(AuthGuard('discogs'))
  @Get('discogs')
  discogsAuth() {}

  @UseGuards(AuthGuard('discogs'))
  @Get('discogs/redirect')
  async discogsAuthRedirect(
    @Req() req: Request
  ) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('test')
  test(@GetUser() user: User) {
    return user;
  }

  @UseGuards(AuthGuard('discogs'))
  @Get('discogs/test')
  async testDiscogs(
    @Req() req: Request
  ) {
    return req.user;
  }

  @Get('user')
  async user(
    @Req() req: Request,
    @GetUser() user: string
    ) {
      return user;
    // try {
    //   // const cookie = req.cookies['otherjwt'];
    //   // const data = await this.authService.verify(cookie);
    //   // const user = await this.authService.getUser(data.username);
    // } catch {
    //   throw new UnauthorizedException()
    // }
  }
}
