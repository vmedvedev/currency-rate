import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CurrenciesService } from '../currencies/currencies.service';
import { Currency } from '../currencies/entities/currency.entity';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { hashPassword } from '../utils';
import { CurrenciesEnum } from '../currencies/currencies.enum';
import { HttpService } from '@nestjs/axios';
jest.mock('@nestjs/axios');

const oneUser = {
  username: 'username#1',
  password: hashPassword('password#1'),
};

const currency = {
  currency: CurrenciesEnum.BTCUSDT,
  price: 22918.91576787,
  createdAt: '2023-01-27T14:12:20.366Z',
};

describe('JobsService', () => {
  let service: JobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        UsersService,
        CurrenciesService,
        ConfigService,
        HttpService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(oneUser),
            create: jest.fn().mockResolvedValue(oneUser),
            save: jest.fn().mockResolvedValue(oneUser),
          },
        },
        {
          provide: getRepositoryToken(Currency),
          useValue: {
            create: jest.fn().mockResolvedValue(currency),
            save: jest.fn().mockResolvedValue(currency),
          },
        },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
