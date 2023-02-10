import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min, IsString } from 'class-validator';

@ArgsType()
export class CurrenciesArgs {
  @Field()
  @IsString()
  currency: string;

  @Field(() => Int)
  @Min(0)
  skip = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take = 25;
}
