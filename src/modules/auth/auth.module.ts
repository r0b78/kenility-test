import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SharedAuthModule } from '../../shared/auth/shared-auth.module';

@Module({
  imports: [SharedAuthModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
