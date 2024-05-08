import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MapelService } from './service/mapel.service';
import { MateriService } from './service/materi.service';

@Controller('subjects')
export class MapelController {
  constructor(
    private mapelService: MapelService,
    private materiService: MateriService,
  ) {}
  @Post('new-mapel')
  async createMapel(@Body() mapelDto) {
    return await this.mapelService.addMapel(mapelDto);
  }

  @Post('new-materi')
  async createMateri(@Body() materiDto) {
    return await this.materiService.addMateri(materiDto);
  }

  @Get('mapel')
  async findAll() {
    return await this.mapelService.getAllMapel();
  }

  @Get('materi')
  async findMateri() {
    return await this.materiService.getAllMateri();
  }

  @Get('materi/search')
  async findMateriByName(@Query('name') name) {
    return await this.materiService.searchMateriByName(name);
  }
}
