import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrenciesService } from './currencies.service';
import { Currency } from './entities/currency.entity';

@Resolver(() => Currency)
export class CurrenciesResolver {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Query(() => [Currency], { name: 'currencies' })
  findAll() {
    return this.currenciesService.findAll();
  }

  @Query(() => Currency, { name: 'currency' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.currenciesService.findOne(id);
  }
}
