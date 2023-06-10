import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseUserDto } from './dto/response.user.dto';
import { TransformerDtoService } from 'src/common/utils/transformer-dto.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // DTO 쪽에 비밀번호 Exclude() 붙여 plainToClass 로 트랜스폼 하는 방법.
  async getAllUser(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.find();
    return TransformerDtoService.toDto(
      ResponseUserDto,
      users,
    ) as ResponseUserDto[];
  }

  // Entity 쪽에 비밀번호 Exclude() 붙임
  // 이렇게 되면 앤티티를 그대로 넘기게 되는 것이라, 위험할 수 있음.
  async getAllUser2(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.find();
    console.log(users);
    return users;
  }

  /**
   * 결론 : DTO 로 트랜스폼.
   * 엔티티를 그대로 외부로 노출하는 것보다 DTO 를 사용하여 데이터를 전송하는 것이 보안상 좋다.
   * 엔티티는 데이터베이스와 직접적으로 연결되어 있음, 따라서 엔티티를 외부로 노출하면 데이터베이스 구조 및 비즈니스 로직에 대한 정보가 노출될 수 있음.
   */
}
