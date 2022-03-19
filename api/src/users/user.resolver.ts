import { Args, Query, Resolver } from "@nestjs/graphql";
import { User } from 'src/users/user.entity';
import { UserService } from "./user.service";

@Resolver(of => User)
export class UserResolver {
  constructor(
    private userService: UserService
  ) {}

  @Query(returns => User)
  async user(@Args('username', { nullable: true }) username: string): Promise<User> {
    const user = await this.userService.getUser(username);
    return user;
  }
}