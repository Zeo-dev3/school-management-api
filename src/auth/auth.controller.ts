import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/model/auth-schema/loginSchema';
import { JwtGuard } from './guards/jwt.guard';
import { ZodValidationPipe } from 'src/model/zod-validation/zod-validation.pipe';
import { LoginSchema } from 'src/model/auth-schema/loginSchema';
import { RegisterUserSchema } from 'src/model/auth-schema/registerUserSchema';
import { RegisterUserDTO } from 'src/model/auth-schema/registerUserSchema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body(new ZodValidationPipe(RegisterUserSchema))
    registerDto: RegisterUserDTO,
  ) {
    return await this.authService.registerUser(registerDto);
  }

  @Post('login')
  async login(@Body(new ZodValidationPipe(LoginSchema)) loginDto: LoginDto) {
    return await this.authService.validateUSer(loginDto);
  }

  @UseGuards(JwtGuard)
  @Get('status')
  async checkStatus() {
    return 'user sudah login';
  }
}
