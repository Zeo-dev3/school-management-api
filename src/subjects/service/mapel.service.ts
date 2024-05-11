import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { MapelDto } from 'src/model/subjects-schema/mapelSchema';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MapelService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

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
    const cachedMapel = await this.cacheManager.get('mapel');
    if (cachedMapel) return JSON.parse(cachedMapel as string);

    const mapel = await this.prisma.mapel.findMany({
      include: { materi: false },
    });

    if (!mapel) throw new HttpException('mapel not found', 404);
    await this.cacheManager.set('mapel', JSON.stringify(mapel));
    return mapel;
  }
}
