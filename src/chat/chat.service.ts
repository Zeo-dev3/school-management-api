import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  async sendMessage(
    userId: string,
    message: string,
  ): Promise<{ userId: string; message: string }> {
    return { userId, message };
  }
}
