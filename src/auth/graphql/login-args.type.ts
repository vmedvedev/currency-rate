import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@ArgsType()
export class LoginArgs {
  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}
