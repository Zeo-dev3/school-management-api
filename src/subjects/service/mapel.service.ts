import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MapelService {
  constructor(private prisma: PrismaService) {}

  async addMapel(mapelDto) {
    const newMapel = await this.prisma.mapel.create({
      data: {
        ...mapelDto,
      },
    });

    if (!newMapel)
      throw new HttpException('cannot create maple,server error', 500);
    return newMapel;
  }

  async getAllMapel() {
    const mapel = await this.prisma.mapel.findMany({
      include: { materi: false },
    });
    if (!mapel) throw new HttpException('mapel not found', 404);
    return mapel;
  }
}
