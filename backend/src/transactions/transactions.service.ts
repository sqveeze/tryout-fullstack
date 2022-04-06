import { Injectable } from '@nestjs/common';
import { CalculateCommissionDto } from './dto/calculate-commission.dto';
import { ExchangeRateService } from '../exchange-rate/exchange-rate.service';

@Injectable()
export class TransactionsService {
  public constructor(
    private readonly exchangeRateService: ExchangeRateService,
  ) {}

  public async calculateCommission(
    calculateCommissionDto: CalculateCommissionDto,
  ): Promise<number> {
    const res = await this.exchangeRateService.getExchangeRate();

    console.log(res);

    return calculateCommissionDto.amount * 0.01;
  }
}
