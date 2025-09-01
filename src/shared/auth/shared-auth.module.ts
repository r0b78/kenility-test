import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.getOrThrow<string>('JWT_SECRET');
        const expiresIn = configService.get<string>('JWT_EXPIRES_IN') ?? '1h';

        if (!secret || !expiresIn) {
          throw new Error(
            'Missing JWT configuration: JWT_SECRET and/or JWT_EXPIRES_IN',
          );
        }

        return {
          secret,
          signOptions: { expiresIn },
        };
      },
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtModule, PassportModule, JwtStrategy],
})
export class SharedAuthModule {}
