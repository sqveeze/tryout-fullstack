import { Body, Controller, Post } from '@nestjs/common';

import { CalculateCommissionDto } from './dto/calculate-commission.dto';
import { TransactionsService } from './transactions.service';

@Controller({
  path: 'transactions',
  version: '1',
})
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('calculate-commission')
  public async calculateCommission(
    @Body() calculateCommissionDto: CalculateCommissionDto,
  ) {
    return this.transactionsService.calculateCommission(calculateCommissionDto);
  }
}
