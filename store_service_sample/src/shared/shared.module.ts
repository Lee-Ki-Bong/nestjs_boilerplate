import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { winstonLoggerOptions } from './configures';
import { WinstonLoggerService } from './services';

const providers = [WinstonLoggerService];

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.development.env'],
      load: [winstonLoggerOptions],
    }),
  ],
  providers: [...providers],
  exports: [...providers],
})
export class SharedModule {}
