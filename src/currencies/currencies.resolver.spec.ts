import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesResolver } from './currencies.resolver';
import { CurrenciesService } from './currencies.service';
import { HttpService } from '@nestjs/axios';
jest.mock('@nestjs/axios');
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Currency } from './entities/currency.entity';
import { CurrenciesEnum } from './currencies.enum';

const currencies = [
  {
    currency: CurrenciesEnum.BTCUSDT,
    price: 22918.62125279,
    createdAt: '2023-01-27T14:12:25.352Z',
  },
  {
    currency: CurrenciesEnum.BTCUSDT,
    price: 22918.91576787,
    createdAt: '2023-01-27T14:12:20.366Z',
  },
];

const currency = {
  currency: CurrenciesEnum.BTCUSDT,
  price: 22918.91576787,
  createdAt: '2023-01-27T14:12:20.366Z',
};

describe('CurrenciesResolver', () => {
  let resolver: CurrenciesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrenciesResolver,
        CurrenciesService,
        HttpService,
        ConfigService,
        {
          provide: getRepositoryToken(Currency),
          useValue: {
            findAndCount: jest.fn().mockResolvedValue([currencies]),
            create: jest.fn().mockResolvedValue(currency),
            save: jest.fn().mockResolvedValue(currency),
          },
        },
      ],
    }).compile();

    resolver = module.get<CurrenciesResolver>(CurrenciesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return an array of currencies', () => {
      expect(
        resolver.findAll({
          currency: CurrenciesEnum.BTCUSDT,
          take: 25,
          skip: 0,
        }),
      ).resolves.toEqual(currencies);
    });
  });
});
