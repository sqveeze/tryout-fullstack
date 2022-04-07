import { ECurrency } from './currency.type';

interface IMotd {
  msg: string;
  url: string;
}

export interface IExchangeRateResponse {
  motd: IMotd;
  success: boolean;
  historical: boolean;
  base: ECurrency;
  date: string;
  rates: Record<ECurrency, number>;
}
