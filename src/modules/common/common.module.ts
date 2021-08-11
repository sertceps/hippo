import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { CommonConfigRegister } from '../config/registers/common.register';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigType<typeof CommonConfigRegister>) => ({
        secret: config.jwtSecret,
        signOptions: { expiresIn: config.jwtExpiresIn }
      }),
      inject: [CommonConfigRegister.KEY]
    })
  ],
  providers: [JwtStrategy],
  exports: [JwtModule]
})
export class CommonModule {}
