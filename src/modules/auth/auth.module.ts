import { forwardRef, Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';

@Module({
  imports: [CommonModule, forwardRef(() => UserModule)],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
