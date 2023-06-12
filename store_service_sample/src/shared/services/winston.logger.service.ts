import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';

@Injectable()
export class WinstonLoggerService {
  private readonly logger: winston.Logger;

  constructor(private readonly configService: ConfigService) {
    const loggerOptions = this.configService.get(
      'winstonLoggerOptions',
    ) as winston.LoggerOptions;
    this.logger = winston.createLogger(loggerOptions);
  }

  log(message: string): void {
    this.logger.info(message);
  }
  info(message: string): void {
    this.logger.info(message);
  }
  debug(message: string): void {
    this.logger.debug(message);
  }
  error(message: string, trace?: any): void {
    // trace 가 객체형태일때 json 문자열로 변환출력하는 것이 필요. Exception 일때 나 등등..
    this.logger.error(`${message} -> (${trace || 'trace not provided !'})`);
  }
  warn(message: string): void {
    this.logger.warn(message);
  }
}
