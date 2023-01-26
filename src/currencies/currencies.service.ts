import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';
import { CreateCurrencyInput } from './dto/create-currency.input';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
  ) {}

  async create(createCurrencyInput: CreateCurrencyInput) {
    const newCurrency = this.currencyRepository.create(createCurrencyInput);
    return await this.currencyRepository.save(newCurrency);
  }

  async findAll() {
    return await this.currencyRepository.find();
  }

  async findOne(id: number) {
    return await this.currencyRepository.findOneBy({ id });
  }
}
