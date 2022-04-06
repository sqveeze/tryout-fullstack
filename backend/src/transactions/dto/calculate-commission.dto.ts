import { IsNotEmpty } from 'class-validator';

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
  public readonly currency: string;

  @IsNotEmpty({ message: 'ERROR.TRANSACTIONS.CLIENT_ID_IS_REQUIRED' })
  public readonly client_id: number;
}
