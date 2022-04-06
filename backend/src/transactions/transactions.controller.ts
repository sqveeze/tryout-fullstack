import { Controller, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CalculateCommissionDto } from './dto/calculate-commission.dto';

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
