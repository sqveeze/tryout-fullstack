import { exchangeApiConfig } from '@config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ExchangeRateService } from './exchange-rate.service';

@Module({
  imports: [HttpModule.registerAsync(exchangeApiConfig)],
  providers: [ExchangeRateService],
  exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
