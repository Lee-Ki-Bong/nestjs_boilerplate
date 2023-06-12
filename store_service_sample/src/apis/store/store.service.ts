import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransformerDtoService } from 'src/shared/utils/transformer-dto.service';
import { Repository } from 'typeorm';
import { ResponseStoreDto } from './dto/response-store.dto';
import { StoreInfo } from './entities/store.entity';
import { SaveStoreDto } from './dto/save-store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreInfo)
    private readonly storeInfoRepository: Repository<StoreInfo>,
  ) {}

  getAll() {
    const storeInfos = this.storeInfoRepository.find();
    return TransformerDtoService.toDto(ResponseStoreDto, storeInfos);
  }

  getOne(service_id: string) {
    const storeInfo = this.storeInfoRepository.findOne({
      where: { si_service_id: service_id },
    });
    return TransformerDtoService.toDto(ResponseStoreDto, storeInfo);
  }

  async save(dto: SaveStoreDto) {
    const storeInfo = this.storeInfoRepository.create(dto);
    const newStoreInfo = this.storeInfoRepository.save(storeInfo);
    return TransformerDtoService.toDto(ResponseStoreDto, newStoreInfo);
  }
}
