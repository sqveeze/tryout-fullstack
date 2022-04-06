import { Injectable } from '@nestjs/common';
import { CalculateCommissionDto } from './dto/calculate-commission.dto';

@Injectable()
export class TransactionsService {
  public async calculateCommission(
    calculateCommissionDto: CalculateCommissionDto,
  ): Promise<number> {
    return calculateCommissionDto.amount * 0.01;
  }
}
