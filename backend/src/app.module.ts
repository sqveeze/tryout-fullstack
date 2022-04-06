import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRootAsync(databaseConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
