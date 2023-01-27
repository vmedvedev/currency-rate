import { ObjectType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class LoginType {
  @Field()
  @IsString()
  readonly access_token: string;
}
