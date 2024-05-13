import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  clientToUser = {};

  async sendMessage(userId: string, message: string) {
    return { userId, message };
  }

  async identify(name, clientId) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }
}
