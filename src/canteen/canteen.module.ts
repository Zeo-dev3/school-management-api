import { Module } from '@nestjs/common';
import { CanteenController } from './canteen.controller';
import { CanteenService } from './canteen.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CanteenController],
  providers: [CanteenService, PrismaService],
})
export class CanteenModule {}
