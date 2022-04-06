import { Injectable } from '@nestjs/common';
import { CalculateCommissionDto } from './dto/calculate-commission.dto';
import { ExchangeRateService } from '../exchange-rate/exchange-rate.service';
import { ECurrency } from '@types';

@Injectable()
export class TransactionsService {
  public constructor(
    private readonly exchangeRateService: ExchangeRateService,
  ) {}

  private static getCommission(
    calculateCommissionDto: CalculateCommissionDto,
  ): number[] {
    // Assume this comes from DB
    const discountedClients = [42];

    const defaultCommission = calculateCommissionDto.amount * 0.05;

    const discountedClient = discountedClients.includes(
      calculateCommissionDto.client_id,
    )
      ? 0.05
      : null;

    // TODO
    const highTurnoverDiscount = 0.05;

    const result = [defaultCommission, highTurnoverDiscount];

    if (discountedClient) result.push(discountedClient);

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

    const commissions = TransactionsService.getCommission(
      getConvertedTransaction,
    );

    const lowestCommissionToApply = commissions.sort((a, b) => a - b)[0];

    return {
      amount: lowestCommissionToApply,
      currency: getConvertedTransaction.currency,
    };
  }
}
