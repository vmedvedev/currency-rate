import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './entities/currency.entity';
import { CreateCurrencyInput } from './dto/create-currency.input';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { CurrenciesEnum } from './currencies.enum';

@Injectable()
export class CurrenciesService {
  private readonly logger = new Logger(CurrenciesService.name);

  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async create(createCurrencyInput: CreateCurrencyInput): Promise<Currency> {
    const newCurrency = this.currencyRepository.create(createCurrencyInput);
    return await this.currencyRepository.save(newCurrency);
  }

  async findAll(): Promise<Currency[]> {
    return await this.currencyRepository.find();
  }

  async syncCurrencyPrice(currencyName: CurrenciesEnum): Promise<void> {
    this.logger.debug(`Starting sync ${currencyName} price...`);
    try {
      const price = await this.fetchCurrencyPrice(currencyName);
      this.create({ currency: currencyName, price: price });
    } catch (e) {
      this.logger.error(e);
    }
  }

  async fetchCurrencyPrice(currencyName: CurrenciesEnum): Promise<number> {
    const binanceUrl = this.configService.get<string>('BINANCE_API_URL');
    const url = new URL(binanceUrl);
    url.search = `?symbol=${currencyName}`;

    const { data, status } = await firstValueFrom(
      this.httpService.get(url.toString()).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw new Error('An HTTP request error happened!');
        }),
      ),
    );

    if (status !== HttpStatus.OK) {
      throw new Error(
        `Server responded with invalid HTTP status ${HttpStatus[status]}`,
      );
    }

    this.logger.debug(`Fetched ${currencyName} price: ${data?.price}`);

    return Number(data?.price);
  }
}
