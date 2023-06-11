import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { WinstonLoggerService } from './shared/services/winston.logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: WinstonLoggerService,
  ) {}

  @Get()
  getHello(): string {
    this.logger.log('hello winston');
    return this.appService.getHello();
  }
}
