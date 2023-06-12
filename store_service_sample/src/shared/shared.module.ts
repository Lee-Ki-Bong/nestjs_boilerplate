import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { typeOrmOption, winstonLoggerOptions } from './configures';
import { DataBaseModule } from './database/database.module';
import { WinstonLoggerService } from './services';

const modules = [DataBaseModule];
const providers = [WinstonLoggerService];

@Global()
@Module({
  imports: [
    ...modules,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.development.env'],
      load: [winstonLoggerOptions, typeOrmOption],
    }),
  ],
  providers: [...providers],
  exports: [...providers],
})
export class SharedModule {}
