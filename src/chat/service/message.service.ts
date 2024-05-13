import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async createMessage(userId, createMessage) {
    const createdMessage = await this.prisma.message.create({
      data: {
        name: createMessage.name,
        text: createMessage.text,
      },
    });
    if (!createdMessage) throw new HttpException('create message failed', 500);

    return { socketId: userId, payload: createdMessage };
  }

  async findAllMessage() {
    const message = await this.prisma.message.findMany();
    if (!message) throw new HttpException('message not found', 404);

    return message;
  }
}
