import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseUserDto } from './dto/response.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SerializeOptions({
    excludePrefixes: ['_'], // 앞에 _ 가 붙은 엔티티 맴버 제외. (이런 방법도 있음.)
  })
  @Get('1')
  async getAllUser(): Promise<ResponseUserDto[]> {
    return await this.userService.getAllUser();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('2')
  async getAllUser2(): Promise<ResponseUserDto[]> {
    return await this.userService.getAllUser2();
  }
}
