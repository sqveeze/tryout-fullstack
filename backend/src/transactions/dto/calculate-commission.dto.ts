import { IsEnum, IsNotEmpty } from 'class-validator';
import { ECurrency } from '@types';

export class CalculateCommissionDto {
  @IsNotEmpty({
    message: 'ERROR.TRANSACTIONS.CALCULATE_COMMISSION.DATE_IS_REQUIRED',
  })
  public readonly date: string;

  @IsNotEmpty({
    message: 'ERROR.TRANSACTIONS.CALCULATE_COMMISSION.AMOUNT_IS_REQUIRED',
  })
  public readonly amount: number;

  @IsNotEmpty({
    message: 'ERROR.TRANSACTIONS.CALCULATE_COMMISSION.CURRENCY_IS_REQUIRED',
  })
  @IsEnum(ECurrency, {
    message: 'ERROR.TRANSACTIONS.CALCULATE_COMMISSION.INVALID_CURRENCY',
  })
  public readonly currency: ECurrency;

  @IsNotEmpty({ message: 'ERROR.TRANSACTIONS.CLIENT_ID_IS_REQUIRED' })
  public readonly client_id: number;
}
