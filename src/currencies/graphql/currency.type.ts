import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Currency {
  @Field()
  currency: string;

  @Field()
  price: number;

  @Field()
  createdAt: Date;
}
