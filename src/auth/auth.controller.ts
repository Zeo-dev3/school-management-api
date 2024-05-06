import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dtos/registerUser.dto';
import { LoginDto } from './dtos/loginDto';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() registerDto: RegisterUserDTO) {
    return await this.authService.registerUser(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.validateUSer(loginDto);
  }

  @UseGuards(JwtGuard)
  @Get('status')
  async checkStatus() {
    return 'user sudah login';
  }
}
