import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken() {
    return {
      access_token: this.jwtService.sign({
        username: `name_${Math.random().toString(36).substring(2, 8)}`,
        role: 'user',
      }),
    };
  }
}
