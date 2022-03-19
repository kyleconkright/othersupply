import { InputType, Field } from '@nestjs/graphql';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {

  @Field()
  @MinLength(5)
  @MaxLength(15)
  @Matches(/^\S*$/, { message: 'Username cannot contain spaces' })
  username: string;


  @Field()
  @IsString()
  @MinLength(8, {
    message: 'Password is too short',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password Must Contain At Least 1 Number, 1 Uppercase, 1 Lowercase',
  })
  password: string;

}
