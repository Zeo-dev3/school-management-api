import { HttpException, Injectable } from '@nestjs/common';
import { MateriDto } from 'src/model/subjects-schema/materiSchema';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MateriService {
  constructor(private prisma: PrismaService) {}

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
