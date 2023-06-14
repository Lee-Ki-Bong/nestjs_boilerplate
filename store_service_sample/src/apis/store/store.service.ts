import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransformerDtoService } from 'src/shared/utils/transformer-dto.service';
import { DataSource, Repository } from 'typeorm';
import { ResponseStoreDto } from './dto/response-store.dto';
import { StoreInfo } from '../../entities/store.entity';
import { SaveStoreDto } from './dto/save-store.dto';
import { paginate } from 'src/shared/paginate/paginate';
import { PaginationTypeEnum } from 'src/shared/paginate/paginate.interface';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreInfo)
    private readonly storeInfoRepository: Repository<StoreInfo>,
    private readonly dataSource: DataSource,
  ) {}

  async getAll() {
    const qr = this.dataSource.createQueryRunner();
    const qb = this.storeInfoRepository.createQueryBuilder(
      this.storeInfoRepository.metadata.tableName,
      qr,
    );

    console.log(qb);

    const result = await paginate(this.storeInfoRepository, {
      limit: 10,
      page: 2,
      // paginationType: PaginationTypeEnum.LIMIT_AND_OFFSET,
      paginationType: PaginationTypeEnum.TAKE_AND_SKIP,
      route: 'localhost:3000',
    });
    return TransformerDtoService.toDto(ResponseStoreDto, result);

    const storeInfos = await this.storeInfoRepository.find();
    return TransformerDtoService.toDto(ResponseStoreDto, storeInfos);
  }

  async getOne(service_id: string) {
    const storeInfo = await this.storeInfoRepository.findOne({
      where: { si_service_id: service_id },
    });
    return TransformerDtoService.toDto(ResponseStoreDto, storeInfo);
  }

  async save(dto: SaveStoreDto) {
    const storeInfo = this.storeInfoRepository.create(dto);
    const newStoreInfo = await this.storeInfoRepository.save(storeInfo);
    return TransformerDtoService.toDto(ResponseStoreDto, newStoreInfo);
  }
}
