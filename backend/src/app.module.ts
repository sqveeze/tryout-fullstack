import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './validations/config.validation';
import { TransactionsModule } from './transactions/transactions.module';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';

@Module({
  imports: [ConfigModule.forRoot({ validationSchema }), TransactionsModule, ExchangeRateModule],
})
export class AppModule {}
