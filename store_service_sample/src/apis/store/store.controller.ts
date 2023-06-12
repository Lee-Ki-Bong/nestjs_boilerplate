import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import { SaveStoreDto } from './dto/save-store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  getAll() {
    return this.storeService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') service_id: string) {
    return this.storeService.getOne(service_id);
  }

  @Post()
  save(@Body() saveDto: SaveStoreDto) {
    return this.storeService.save(saveDto);
  }
}
