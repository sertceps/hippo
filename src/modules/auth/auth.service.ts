import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenResDto } from '../common/dtos/token.res.dto';
import { UserDocument } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<boolean> {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === pass) return true;

    return false;
  }

  async login(user: UserDocument): Promise<TokenResDto> {
    const payload = { email: user.email, id: user._id };

    return { access_token: this.jwtService.sign(payload) };
  }
}
