import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MateriService {
  constructor(private prisma: PrismaService) {}

  async addMateri(materiDto) {
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
    return newMateri;
  }

  async getAllMateri() {
    const materiList = await this.prisma.mapel.findMany({
      include: { materi: true },
    });

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
