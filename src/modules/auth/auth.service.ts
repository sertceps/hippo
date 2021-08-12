import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import * as md5 from 'md5';
import { CommonConfigRegister } from '../config/registers/common.register';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(CommonConfigRegister.KEY)
    private commonConfig: ConfigType<typeof CommonConfigRegister>
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument | null> {
    const user = await this.userService.findOneByEmail(email, true);
    const md5Password = await this.encrypt(password);
    if (user && user.password === md5Password) return user;

    return null;
  }

  async validatePassword(id: string, password: string): Promise<UserDocument | null> {
    const user = await this.userService.findOneByIdWithPassword(id);

    const md5Password = await this.encrypt(password);
    if (user && user.password === md5Password) return user;

    return null;
  }

  async encrypt(password: string): Promise<string> {
    return md5(`${password}${this.commonConfig.passwordSalt}`);
  }

  async certificate(user: UserDocument): Promise<string> {
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role
    };

    const token = this.jwtService.sign(payload);

    return token;
  }
}
