import { Test, TestingModule } from '@nestjs/testing';

import { ExchangeRateModule } from '../exchange-rate/exchange-rate.module';
import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

describe('TransactionsController', () => {
  let controller: TransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ExchangeRateModule],
      controllers: [TransactionsController],
      providers: [
        TransactionsService,
        {
          provide: 'TransactionRepository',
          useValue: TransactionRepository,
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
