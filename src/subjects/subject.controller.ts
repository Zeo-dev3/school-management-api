import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MapelService } from './service/mapel.service';
import { MateriService } from './service/materi.service';
import { MapelDto, MapelSchema } from 'src/model/subjects-schema/mapelSchema';
import { ZodValidationPipe } from 'src/model/zod-validation/zod-validation.pipe';
import {
  MateriDto,
  MateriSchema,
} from 'src/model/subjects-schema/materiSchema';

@Controller('subjects')
export class MapelController {
  constructor(
    private mapelService: MapelService,
    private materiService: MateriService,
  ) {}

  @Post('new-mapel')
  async createMapel(
    @Body(new ZodValidationPipe(MapelSchema)) mapelDto: MapelDto,
  ) {
    return await this.mapelService.addMapel(mapelDto);
  }

  @Post('new-materi')
  async createMateri(
    @Body(new ZodValidationPipe(MateriSchema)) materiDto: MateriDto,
  ) {
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
