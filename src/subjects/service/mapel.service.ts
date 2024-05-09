import { HttpException, Injectable } from '@nestjs/common';
import { MapelDto } from 'src/model/subjects-schema/mapelSchema';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MapelService {
  constructor(private prisma: PrismaService) {}

  async addMapel(mapelDto: MapelDto) {
    const newMapel = await this.prisma.mapel.create({
      data: {
        mapel: mapelDto.mapel,
      },
    });

    if (!newMapel)
      throw new HttpException('cannot create maple,server error', 500);
    return {
      message: 'Successfully added new mapel',
      mapelName: newMapel.mapel,
    };
  }

  async getAllMapel() {
    const mapel = await this.prisma.mapel.findMany({
      include: { materi: false },
    });
    if (!mapel) throw new HttpException('mapel not found', 404);
    return mapel;
  }
}
