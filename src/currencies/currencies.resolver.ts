import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { CurrenciesService } from './currencies.service';
import { Currency } from './graphql/currency.type';
import { CurrenciesEnum } from './currencies.enum';

@Resolver(() => Currency)
export class CurrenciesResolver {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Query(() => [Currency], { name: 'currencies' })
  findAll() {
    return this.currenciesService.findAll();
  }

  @Query(() => Number, { name: 'currencyPrice' })
  async currencyPrice(@Args('currency') currency: CurrenciesEnum) {
    return await this.currenciesService.fetchCurrencyPrice(currency);
  }
}
