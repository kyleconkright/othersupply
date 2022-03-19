import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "src/users/user.entity";

@ObjectType({ description: 'signUpResult' })
export class SignUpResult extends User {
  @Field()
  accessToken: string;

  @Field()
  username: string;
}

@ObjectType({ description: 'signInResult' })
export class SignInResult extends User {
  @Field()
  accessToken: string;

  @Field()
  username: string;
}