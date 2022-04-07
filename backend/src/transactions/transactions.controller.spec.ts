import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType } from '@types';
import { Repository } from 'typeorm';

import { ExchangeRateModule } from '../exchange-rate/exchange-rate.module';
import { Transaction } from './entities/transaction.entity';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    find: jest.fn((entity) => [entity]),
    save: jest.fn((entity) => entity),
  }),
);

describe('TransactionsController', () => {
  let controller: TransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ExchangeRateModule],
      controllers: [TransactionsController],
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(Transaction),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
