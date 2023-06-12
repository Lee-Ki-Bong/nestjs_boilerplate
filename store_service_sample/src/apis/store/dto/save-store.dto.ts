'use strict';

import { IsNotEmpty, IsString, IsInt, MaxLength } from 'class-validator';

export class SaveStoreDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  si_service_id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  si_store_id: string;

  @IsNotEmpty()
  @IsInt()
  si_category: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  si_email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  si_name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  si_phone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  si_privacy_manager: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  si_biz_hours: string;
}
