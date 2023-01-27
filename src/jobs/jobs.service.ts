import { Injectable, Logger } from '@nestjs/common';
import * as schedule from 'node-schedule';
import { ConfigService } from '@nestjs/config';
import { CurrenciesService } from '../currencies/currencies.service';
import { CurrenciesEnum } from '../currencies/currencies.enum';
import { UsersService } from '../users/users.service';
import { hashPassword } from '../utils';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly currenciesService: CurrenciesService,
    private readonly usersService: UsersService,
  ) {
    this.createGuestUserJob();
    this.startFetchJob();
  }

  startFetchJob() {
    const fetchIntervalSec =
      this.configService.get<number>('FETCH_INTERVAL_SEC');

    schedule.scheduleJob(`*/${fetchIntervalSec} * * * * *`, () => {
      this.logger.log('Starting fetch job.');
      try {
        this.currenciesService.syncCurrencyPrice(CurrenciesEnum.BTCUSDT);
      } catch (e) {
        this.logger.error(e);
      }
    });
  }

  async createGuestUserJob() {
    const user = await this.usersService.findOne('guest');

    if (!user) {
      this.logger.debug('Creating Guest user.');
      this.usersService.create({
        username: 'guest',
        password: hashPassword('guest'),
      });
    }
  }
}
