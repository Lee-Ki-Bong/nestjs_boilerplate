import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TableNamingStrategy } from '../database/strategy/table.naming.strategy';
import { StoreInfoSubscriber } from 'src/apis/store/subscriber/store.subscriber';

export const typeOrmOption = registerAs(
  'typeOrmOption',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../../**/*.entity.*'],
    subscribers: [__dirname + '/../../apis/**/*.subscriber.*'],
    synchronize: false,
    namingStrategy: new TableNamingStrategy(), // 네이밍 전략 설정
  }),
);
