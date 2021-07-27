import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<Boolean> {
    const res = await this.authService.validateUser(email, password);
    console.log('this');

    if (!res) throw new UnauthorizedException('无权限，请登录');

    return res;
  }
}
