import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { StoreInfo } from '../entities/store.entity';

export class ResponseStoreDto extends PartialType(StoreInfo) {
  @Exclude()
  si_privacy_manager: string;
}
