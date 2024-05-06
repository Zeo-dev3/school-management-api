import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserByName(name: string) {
    const matchUser = await this.prisma.user.findUnique({
      where: {
        name,
      },
    });

    if (!matchUser) throw new HttpException('User not found', 404);

    return matchUser;
  }
}
