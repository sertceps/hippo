import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants/constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [JwtModule.register({ secret: jwtConstants.secret, signOptions: { expiresIn: '1h' } }), forwardRef(() => UserModule)],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
