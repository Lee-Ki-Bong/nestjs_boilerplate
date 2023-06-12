import { Controller, Get, Param } from '@nestjs/common';
import { StoreService } from './store.service';

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
}
