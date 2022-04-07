import { databaseConfig } from '@config';
import { VersioningType } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { MockType } from '@types';
import { validationSchema } from '@validations';
import { EntityRepository, Repository } from 'typeorm';

import { ExchangeRateModule } from '../src/exchange-rate/exchange-rate.module';
import { Transaction } from '../src/transactions/entities/transaction.entity';
import { TransactionsController } from '../src/transactions/transactions.controller';
import { TransactionsService } from '../src/transactions/transactions.service';

let app: NestFastifyApplication;

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({ validationSchema: validationSchema }),
      TypeOrmModule.forRootAsync(databaseConfig),
      TypeOrmModule.forFeature([Transaction]),
      ExchangeRateModule,
    ],
    controllers: [TransactionsController],
    providers: [TransactionsService],
  }).compile();

  app = module.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(),
  );

  await app.setGlobalPrefix('api');
  await app.enableVersioning({ type: VersioningType.URI });
  await app.init();
  await app.getHttpAdapter().getInstance().ready();
});

it(`/POST calculate-commission`, () => {
  return app
    .inject({
      method: 'POST',
      url: 'api/v1/transactions/calculate-commission',
      payload: {
        date: '2022-04-05',
        amount: 500,
        currency: 'EUR',
        client_id: 1,
      },
    })
    .then((result) => {
      expect(result.statusCode).toEqual(201);
      expect(JSON.parse(result.payload)).toEqual({
        amount: 2.5,
        currency: 'EUR',
      });
    });
});

it(`/POST calculate-commission min 0.5`, () => {
  return app
    .inject({
      method: 'POST',
      url: 'api/v1/transactions/calculate-commission',
      payload: {
        date: '2022-04-05',
        amount: 10,
        currency: 'EUR',
        client_id: 5,
      },
    })
    .then((result) => {
      expect(result.statusCode).toEqual(201);
      expect(JSON.parse(result.payload)).toEqual({
        amount: 0.05,
        currency: 'EUR',
      });
    });
});

it(`/POST calculate-commission discounted client`, () => {
  return app
    .inject({
      method: 'POST',
      url: 'api/v1/transactions/calculate-commission',
      payload: {
        date: '2022-04-05',
        amount: 500,
        currency: 'USD',
        client_id: 42,
      },
    })
    .then((result) => {
      expect(result.statusCode).toEqual(201);
      expect(JSON.parse(result.payload)).toEqual({
        amount: 0.05,
        currency: 'EUR',
      });
    });
});

it(`/POST calculate-commission high turnover`, async () => {
  await app.inject({
    method: 'POST',
    url: 'api/v1/transactions/calculate-commission',
    payload: {
      date: '2022-04-05',
      amount: 1500,
      currency: 'USD',
      client_id: 100,
    },
  });

  return app
    .inject({
      method: 'POST',
      url: 'api/v1/transactions/calculate-commission',
      payload: {
        date: '2022-04-05',
        amount: 999,
        currency: 'USD',
        client_id: 100,
      },
    })
    .then((result) => {
      expect(result.statusCode).toEqual(201);
      expect(JSON.parse(result.payload)).toEqual({
        amount: 0.03,
        currency: 'EUR',
      });
    });
});

afterAll(async () => {
  await app.close();
});
