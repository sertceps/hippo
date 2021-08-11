import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants/constants';
import { JwtStrategy } from '../auth/jwt.strategy';

@Global()
@Module({
  imports: [JwtModule.register({ secret: jwtConstants.secret, signOptions: { expiresIn: '1h' } })],
  providers: [JwtStrategy],
  exports: [JwtModule]
})
export class CommonModule {}
