import { CreateCurrencyInput } from './create-currency.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCurrencyInput extends PartialType(CreateCurrencyInput) {
  @Field(() => ID)
  id: number;

  @Field()
  currency: string;

  @Field()
  price: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
