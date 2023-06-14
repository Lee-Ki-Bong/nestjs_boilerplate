import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreInfo } from '../../entities/store.entity';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoreInfo])],
  providers: [StoreService],
  controllers: [StoreController],
})
export class StoreModule {}
