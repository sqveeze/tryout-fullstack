import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from '@validations';
import { TransactionsModule } from './transactions/transactions.module';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '@config';

@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema }),
    TypeOrmModule.forRootAsync(databaseConfig),
    TransactionsModule,
    ExchangeRateModule,
  ],
})
export class AppModule {}
