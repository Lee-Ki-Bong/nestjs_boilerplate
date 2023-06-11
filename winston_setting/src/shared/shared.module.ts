import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import winstonLoggerOptions from './configures/winstonLoggerOptions';
import { WinstonLoggerService } from './services/winston.logger.service';

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
