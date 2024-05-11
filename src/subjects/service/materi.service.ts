import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { MateriDto } from 'src/model/subjects-schema/materiSchema';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class MateriService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async addMateri(materiDto: MateriDto) {
    const newMateri = await this.prisma.materi.create({
      data: {
        name: materiDto.name,
        author: materiDto.author,
        lesson: materiDto.lesson,
        Mapel: { connect: { id: materiDto.mapelId } },
      },
    });

    if (!newMateri)
      throw new HttpException('cannot create materi,server error', 500);
    return {
      message: 'Materi successfully added',
      Id: newMateri.id,
      Name: newMateri.name,
    };
  }

  async getAllMateri() {
    const cachedMateri = await this.cacheManager.get('Materi');
    if (cachedMateri) return JSON.parse(cachedMateri as string);

    const materiList = await this.prisma.mapel.findMany({
      include: { materi: true },
    });

    await this.cacheManager.set('Materi', JSON.stringify(materiList));

    return materiList;
  }

  async searchMateriByName(name) {
    const searchedMateri = await this.prisma.materi.findMany({
      where: {
        name: { contains: name },
      },
    });

    if (!searchedMateri) throw new HttpException('materi not found', 404);
    return searchedMateri;
  }
}
