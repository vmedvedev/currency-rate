import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { CurrenciesService } from './currencies.service';
import { Currency } from './graphql/currency.type';
import { CurrenciesArgs } from './graphql/currencies-args.type';
import { CurrenciesEnum } from './currencies.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Resolver(() => Currency)
export class CurrenciesResolver {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Query(() => [Currency], { name: 'currencies' })
  findAll(@Args() currenciesArgs: CurrenciesArgs) {
    return this.currenciesService.findAll(currenciesArgs);
  }

  @Query(() => Number, { name: 'currencyPrice' })
  async currencyPrice(@Args('currency') currency: CurrenciesEnum) {
    return await this.currenciesService.fetchCurrencyPrice(currency);
  }
}
