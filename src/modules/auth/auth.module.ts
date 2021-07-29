import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
// import { jwtConstants } from './constants/constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule
    // PassportModule.register({ defaultStrategy: 'jwt' })
    // JwtModule.register({ secret: jwtConstants.secret, signOptions: { expiresIn: '1h' } })
    // 不加上面两个，没有影响？
  ],
  providers: [AuthService, JwtStrategy]
  // exports: [AuthService]
})
export class AuthModule {}
