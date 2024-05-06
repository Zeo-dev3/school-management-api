import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { RegisterUserDTO } from './dtos/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/loginDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDTO) {
    const { name, pin, alamat, kelas } = registerUserDto;
    const saltRounds = 10;

    const hashedPin = await bcrypt.hash(pin, saltRounds).catch((err) => {
      console.log(err);
      throw new HttpException('Failed to hash password', 500);
    });

    const createdUser = await this.prisma.user.create({
      data: {
        name,
        alamat,
        pin: hashedPin,
        kelas,
      },
    });

    if (!createdUser) throw new HttpException('Failed to register user', 500);

    return createdUser;
  }

  async validateUSer(loginDto: LoginDto) {
    const { name, pin } = loginDto;

    const matchUser = await this.userService.getUserByName(name);
    if (!matchUser)
      throw new UnauthorizedException('name or password is wrong');

    const comparePassword = await bcrypt.compare(pin, matchUser.pin);
    if (!comparePassword)
      throw new UnauthorizedException('name or password is wrong');

    const tokenPayload = { id: matchUser.id, name: matchUser.name };
    const token = this.jwtService.sign(tokenPayload, {
      secret: '556bc519614b7c5f956b5ea2606e9934a533939a',
    });

    return {
      msg: 'login success',
      token,
    };
  }
}
