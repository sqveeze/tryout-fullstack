import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType } from '@types';
import { Repository } from 'typeorm';

import { ExchangeRateModule } from '../exchange-rate/exchange-rate.module';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    find: jest.fn((entity) => [entity]),
    save: jest.fn((entity) => entity),
  }),
);

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ExchangeRateModule],
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(Transaction),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
