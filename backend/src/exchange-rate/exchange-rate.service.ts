import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as moment from 'moment';
import { ECurrency } from '@types';

@Injectable()
export class ExchangeRateService {
  private readonly logger: Logger = new Logger(ExchangeRateService.name);

  public constructor(private readonly exchangeRateApiService: HttpService) {}

  // Normally I would write types for this but for this homework I will just use any.
  public async getExchangeRate(
    date: string = moment().format('YYYY-MM-DD'),
    currency: ECurrency = ECurrency.EUR,
  ): Promise<any> {
    const isValid = moment(date, 'YYYY-MM-DD', true).isValid();

    if (!isValid) {
      throw new HttpException(
        'ERROR.EXCHANGE_RATE.GET_EXCHANGE_RATE.INVALID_DATE',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      // toPromise is deprecated but for this homework it's faster to use it than handling rx observables.
      // Normally I would write types for this but for this homework I will just use any.
      const { data } = await this.exchangeRateApiService
        .get<any>(date, {
          params: {
            currency,
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
