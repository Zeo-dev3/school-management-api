import { Module } from '@nestjs/common';
import { ChatService } from './service/chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageService } from './service/message.service';

@Module({
  providers: [ChatService, ChatGateway, PrismaService, MessageService],
  controllers: [ChatController],
})
export class ChatModule {}
