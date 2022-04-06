import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const isDevelopment =
      configService.get<string>('NODE_ENV') === 'development';

    const baseOpts = {
      ...(!isDevelopment && {
        ssl: { rejectUnauthorized: false },
      }),
      autoLoadEntities: true,
      synchronize: false,
    };

    return {
      type: 'postgres',
      // Base options is always common between dev, prod and staging env.
      ...baseOpts,
      ...(isDevelopment
        ? {
            // in development use separate database config vars from .env
            host: configService.get<string>('DATABASE_HOST'),
            port: configService.get<number>('DATABASE_PORT'),
            username: configService.get<string>('DATABASE_USERNAME'),
            password: configService.get<string>('DATABASE_PASSWORD'),
            database: configService.get<string>('DATABASE_NAME'),
          }
        : {
            // in production or staging environment usually the hosting provider gives only a connection url.
            url: configService.get<string>('DATABASE_URL'),
          }),
    };
  },
};
