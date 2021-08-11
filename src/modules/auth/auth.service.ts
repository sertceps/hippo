import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';

// TODO token 用户不存在应？
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<UserDocument | null> {
    const user = await this.userService.findOneByEmail(email, true);
    if (user && user.password === password) return user;

    return null;
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

  async decodeToken(authorization: string): Promise<{ email: string; id: string; iat: number; exp: number }> {
    const token = authorization.replace('Bearer ', '');
    const payload = this.jwtService.decode(token, { json: true }) as { email: string; id: string; role: string; iat: number; exp: number };

    return payload;
  }
}
