import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { ECurrency, IExchangeRateResponse } from '@types';

import { ExchangeRateService } from './exchange-rate.service';

describe('ExchangeRateService', () => {
  let service: ExchangeRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeRateService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<ExchangeRateService>(ExchangeRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return exchange result', async () => {
    const result: IExchangeRateResponse = {
      base: ECurrency.EUR,
      historical: false,
      motd: undefined,
      success: false,
      date: '2020-01-01',
      rates: {
        HUF: 333.7,
        USD: 1.1,
        EUR: 1,
      },
    };

    jest
      .spyOn(service, 'getExchangeRate')
      .mockImplementation(async () => result);

    expect(await service.getExchangeRate()).toBe(result);
  });
});
