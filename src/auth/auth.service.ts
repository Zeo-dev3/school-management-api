import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDTO } from 'src/model/auth-schema/registerUserSchema';
import { LoginDto } from '../model/auth-schema/loginSchema';
import { compareHash, hashPin } from 'src/utils/helper';

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

    const hashedPin = await hashPin(pin, saltRounds).catch((err) => {
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

    return {
      message: 'User created successfully',
      userId: createdUser.id,
    };
  }

  async validateUSer(loginDto: LoginDto) {
    const { name, pin } = loginDto;

    const matchUser = await this.userService.getUserByName(name);
    if (!matchUser)
      throw new UnauthorizedException('name or password is wrong');

    const comparePassword = await compareHash(pin, matchUser.pin);
    if (!comparePassword)
      throw new UnauthorizedException('name or password is wrong');

    const tokenPayload = { id: matchUser.id, name: matchUser.name };
    const token = this.jwtService.sign(tokenPayload, {
      secret: '556bc519614b7c5f956b5ea2606e9934a533939a',
    });

    return {
      message: 'login success',
      token,
    };
  }
}
