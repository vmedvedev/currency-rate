import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCurrencyInput {
  @Field()
  currency: string;

  @Field()
  price: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
