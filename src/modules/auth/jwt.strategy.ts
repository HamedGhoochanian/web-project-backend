import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: process.env.AUTH_SECRET_KEY,
    });
  }

  async validate(payload) {
    return payload;
  }
}
