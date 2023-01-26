import { Injectable, Logger } from '@nestjs/common';
import * as schedule from 'node-schedule';
import { ConfigService } from '@nestjs/config';
import { CurrenciesService } from '../currencies/currencies.service';
import { CurrenciesEnum } from '../currencies/currencies.enum';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly currenciesService: CurrenciesService,
  ) {
    this.startFetchJob();
  }

  startFetchJob() {
    const fetchIntervalSec =
      this.configService.get<number>('FETCH_INTERVAL_SEC');
    console.log('startFetchJob');
    schedule.scheduleJob(`*/${fetchIntervalSec} * * * * *`, () => {
      this.logger.log('Starting fetch job.');
      try {
        this.currenciesService.syncCurrencyPrice(CurrenciesEnum.BTCUSDT);
      } catch (e) {
        this.logger.error(e);
      }
    });
  }
}
