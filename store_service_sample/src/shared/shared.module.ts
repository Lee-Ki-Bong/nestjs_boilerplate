import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOption, winstonLoggerOptions } from './configures';
import { WinstonLoggerService } from './services';

const providers = [WinstonLoggerService];

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.development.env'],
      load: [winstonLoggerOptions, typeOrmOption],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('typeOrmOption'),
      inject: [ConfigService],
    }),
  ],
  providers: [...providers],
  exports: [...providers],
})
export class SharedModule {}
