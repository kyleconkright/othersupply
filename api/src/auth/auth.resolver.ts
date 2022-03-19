import { Resolver, Mutation, Args, createUnionType } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { SignInResult, SignUpResult } from './auth.type';

@Resolver(of => User)
export class AuthResolver {
  constructor(
    private authService: AuthService
  ) {}

  @Mutation(returns => SignInResult)
  async signIn(
    @Args('username') username: string,
    @Args('password') password: string
  ): Promise<{accessToken: string, username: string}>  {
    return this.authService.signIn({username, password});
  }
  
  @Mutation(returns => SignUpResult)
  async signUp(
    @Args('username') username: string,
    @Args('password') password: string
  ): Promise<{accessToken: string, username: string}>  {
    const { accessToken } = await this.authService.signUp({username, password});
    return ({username, accessToken});
  }
}