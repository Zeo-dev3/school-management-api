import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'name',
      passwordField: 'pin',
    });
  }

  async validate(name, pin) {
    const user = await this.authService.validateUSer({ name, pin });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}