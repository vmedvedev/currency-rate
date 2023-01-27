import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Currency } from './entities/currency.entity';
import { CurrenciesService } from './currencies.service';
import { HttpService } from '@nestjs/axios';
jest.mock('@nestjs/axios');
import { ConfigService } from '@nestjs/config';
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

describe('CurrenciesService', () => {
  let service: CurrenciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpService,
        ConfigService,
        CurrenciesService,
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

    service = module.get<CurrenciesService>(CurrenciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a currency', () => {
      expect(service.create(currency)).resolves.toEqual(currency);
    });
  });

  describe('findAll()', () => {
    it('should return an array of currencies', () => {
      expect(
        service.findAll({
          currency: CurrenciesEnum.BTCUSDT,
          take: 25,
          skip: 0,
        }),
      ).resolves.toEqual(currencies);
    });
  });
});
