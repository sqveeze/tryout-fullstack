import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const isDevelopment =
      configService.get<string>('NODE_ENV') === 'development';

    const isTest = configService.get<string>('NODE_ENV') === 'test';

    const baseOpts = {
      ...(!isDevelopment &&
        !isTest && {
          ssl: { rejectUnauthorized: false },
        }),
      autoLoadEntities: true,
      // This should be never used even in development and should write proper migrations for db schema change
      synchronize: true,
    };

    return {
      type: 'postgres',
      ...baseOpts,
      ...(isDevelopment || isTest
        ? {
            // In development we use separated db env vars
            host: configService.get<string>('DATABASE_HOST'),
            port: configService.get<number>('DATABASE_PORT'),
            username: configService.get<string>('DATABASE_USERNAME'),
            password: configService.get<string>('DATABASE_PASSWORD'),
            database: configService.get<string>('DATABASE_NAME'),
          }
        : {
            // When not in development we use the env var that usually the db provider inject as an env var into the service like heroku, railway, etc...
            url: configService.get<string>('DATABASE_URL'),
          }),
    };
  },
};
