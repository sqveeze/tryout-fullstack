import { Module } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { HttpModule } from '@nestjs/axios';
import { exchangeApiConfig } from '../config/exchange-api.config';

@Module({
  imports: [HttpModule.registerAsync(exchangeApiConfig)],
  providers: [ExchangeRateService],
  exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
