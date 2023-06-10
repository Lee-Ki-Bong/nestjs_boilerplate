import { PartialType } from '@nestjs/mapped-types';
import { UserEntity } from '../entities/user.entity';
import { Exclude } from 'class-transformer';

export class ResponseUserDto extends PartialType(UserEntity) {
  @Exclude()
  password: string;
}
