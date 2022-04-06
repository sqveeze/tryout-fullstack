import { HttpModuleAsyncOptions, HttpModuleOptions } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const exchangeApiConfig: HttpModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<HttpModuleOptions> => ({
    baseURL: configService.get<string>('EXCHANGE_API_BASE_URL'),
  }),
};
