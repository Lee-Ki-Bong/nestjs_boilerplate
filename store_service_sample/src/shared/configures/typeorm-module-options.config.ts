import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { StoreInfo } from 'src/apis/store/entities/store.entity';
import { DefaultNamingStrategy } from 'typeorm';

export const typeOrmOption = registerAs(
  'typeOrmOption',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: 'boilerplate-mysql-1',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'nms_store',
    entities: [__dirname + '/../../apis/**/*.entity.*'],
    synchronize: false,
    namingStrategy: new DefaultNamingStrategy(), // 네이밍 전략 설정
  }),
);
