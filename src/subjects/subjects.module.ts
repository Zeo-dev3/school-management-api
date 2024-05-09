import { Module } from '@nestjs/common';
import { MapelController } from './subject.controller';
import { MapelService } from './service/mapel.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MateriService } from './service/materi.service';

@Module({
  controllers: [MapelController],
  providers: [MapelService, PrismaService, MateriService],
})
export class SubjectsModule {}
