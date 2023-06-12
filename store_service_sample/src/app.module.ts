import { Module } from '@nestjs/common';
import { StoreModule } from './apis/store/store.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';

const apiModules = [StoreModule];

@Module({
  imports: [SharedModule, ...apiModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
