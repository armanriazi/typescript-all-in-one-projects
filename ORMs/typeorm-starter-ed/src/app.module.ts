import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Employee } from './entities/employee';
import Employer from './entities/employer';

config();
 
const SYNC = true; // always set as false in production
 
export const dbConfig: TypeOrmModuleOptions = {
  url: process.env.DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  type: 'postgres',
  entities: [Employee, Employer],
  logging: SYNC,
  synchronize: SYNC,
} as TypeOrmModuleOptions;

@Module({
  imports: [
     TypeOrmModule.forRoot(dbConfig),
     TypeOrmModule.forFeature([Employee, Employer])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}