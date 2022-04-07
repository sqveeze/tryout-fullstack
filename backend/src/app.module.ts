import { databaseConfig } from '@config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validationSchema } from '@validations';

import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema }),
    TypeOrmModule.forRootAsync(databaseConfig),
    TransactionsModule,
    ExchangeRateModule,
  ],
})
export class AppModule {}
