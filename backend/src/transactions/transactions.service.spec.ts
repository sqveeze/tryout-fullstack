import { Test, TestingModule } from '@nestjs/testing';
import { TransactionRepository } from 'typeorm';

import { ExchangeRateModule } from '../exchange-rate/exchange-rate.module';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ExchangeRateModule],
      providers: [
        TransactionsService,
        {
          provide: 'TransactionRepository',
          useValue: TransactionRepository,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
