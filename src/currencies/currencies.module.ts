import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesResolver } from './currencies.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from './entities/currency.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Currency]), HttpModule],
  providers: [CurrenciesResolver, CurrenciesService],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
