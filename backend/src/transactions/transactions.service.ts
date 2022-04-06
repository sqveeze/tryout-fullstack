import { Injectable } from '@nestjs/common';
import { CalculateCommissionDto } from './dto/calculate-commission.dto';
import { ExchangeRateService } from '../exchange-rate/exchange-rate.service';
import { ECurrency } from '@types';
import { FindManyOptions, Repository, Between } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';

@Injectable()
export class TransactionsService {
  public constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    private readonly exchangeRateService: ExchangeRateService,
  ) {}

  public async findAll(options?: FindManyOptions): Promise<Transaction[]> {
    return await this.transactionsRepository.find(options);
  }

  public async create(transaction: Transaction): Promise<Transaction> {
    return await this.transactionsRepository.save(transaction);
  }

  private async getCommission(
    calculateCommissionDto: CalculateCommissionDto,
  ): Promise<number[]> {
    // Assume this comes from DB
    const discountedClients = [42];

    const defaultCommission = calculateCommissionDto.amount * 0.005;

    const discountedClient = discountedClients.includes(
      calculateCommissionDto.client_id,
    )
      ? 0.05
      : null;

    // get all previous transactions of a client
    const clientTransactions = await this.findAll({
      where: {
        client_id: calculateCommissionDto.client_id,
        date: Between(
          moment(calculateCommissionDto.date).startOf('month'),
          moment(calculateCommissionDto.date).endOf('month'),
        ),
      },
      take: 0, // all
      select: ['amount'],
    });

    // check if client has transactions valued over 1000 in current month
    const highTurnoverDiscount =
      clientTransactions.reduce((acc, curr) => acc + +curr.amount, 0) > 1000
        ? 0.03
        : null;

    const result = [defaultCommission > 0.05 ? defaultCommission : 0.05];

    if (discountedClient) result.push(discountedClient);
    if (highTurnoverDiscount) result.push(highTurnoverDiscount);

    return result;
  }

  private async convertTransactionToEur(
    calculateCommissionDto: CalculateCommissionDto,
  ): Promise<CalculateCommissionDto> {
    if (calculateCommissionDto.currency === ECurrency.EUR)
      return calculateCommissionDto;

    const { date, amount, currency } = calculateCommissionDto;

    const result = await this.exchangeRateService.getExchangeRate(
      date,
      currency,
      amount,
    );

    return {
      ...calculateCommissionDto,
      currency: ECurrency.EUR,
      amount: result.rates[ECurrency.EUR],
    } as CalculateCommissionDto;
  }

  public async calculateCommission(
    calculateCommissionDto: CalculateCommissionDto,
  ): Promise<{ amount: number; currency: ECurrency }> {
    const getConvertedTransaction = await this.convertTransactionToEur(
      calculateCommissionDto,
    );

    const commissions = await this.getCommission(getConvertedTransaction);

    const lowestCommissionToApply = commissions.sort((a, b) => a - b)[0];

    // Create a new transaction
    const transaction = new Transaction();
    transaction.date = moment(calculateCommissionDto.date).toDate();
    transaction.amount = calculateCommissionDto.amount;
    transaction.currency = calculateCommissionDto.currency;
    transaction.client_id = calculateCommissionDto.client_id;

    // Save the transaction
    await this.create(transaction);

    return {
      amount: +lowestCommissionToApply.toFixed(2),
      currency: getConvertedTransaction.currency,
    };
  }
}
