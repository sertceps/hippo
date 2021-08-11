import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CommonConfigRegister } from '../config/registers/common.register';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(CommonConfigRegister.KEY)
    private commonConfig: ConfigType<typeof CommonConfigRegister>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: commonConfig.jwtSecret
    });
  }

  async validate(payload: any) {
    // 使用守卫会调用此处
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}
