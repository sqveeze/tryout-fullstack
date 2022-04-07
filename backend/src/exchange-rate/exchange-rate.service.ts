import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ECurrency, IExchangeRateResponse } from '@types';
import * as moment from 'moment';

@Injectable()
export class ExchangeRateService {
  private readonly logger: Logger = new Logger(ExchangeRateService.name);

  public constructor(private readonly exchangeRateApiService: HttpService) {}

  public async getExchangeRate(
    date: string = moment().format('YYYY-MM-DD'),
    currency: ECurrency = ECurrency.EUR,
    amount = 1,
  ): Promise<IExchangeRateResponse> {
    this.logger.verbose(
      `Getting exchange rate with data: ${JSON.stringify(
        { date, currency, amount },
        null,
        2,
      )}`,
    );

    const isValid = moment(date, 'YYYY-MM-DD', true).isValid();

    if (!isValid) {
      throw new HttpException(
        'ERROR.EXCHANGE_RATE.GET_EXCHANGE_RATE.INVALID_DATE',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      // toPromise is deprecated but for this homework it's faster to use it than handling rx observables.
      const { data } = await this.exchangeRateApiService
        .get<IExchangeRateResponse>(date, {
          params: {
            base: currency,
            amount,
          },
        })
        .toPromise();

      return data;
    } catch (e) {
      this.logger.error(e.response?.data);

      // Report this to sentry or other error tracking service.

      throw new HttpException(
        'ERROR.EXCHANGE_RATE.GET_EXCHANGE_RATE.ERROR_WHILE_GETTING_EXCHANGE_RATES',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
