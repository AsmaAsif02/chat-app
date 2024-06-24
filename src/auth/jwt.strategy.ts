import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

/**
 * Strategy to handle JWT validation.
 */
@Injectable()
export class JwtStategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

    /**
   * Validates the JWT payload.
   * @param payload - The JWT payload.
   * @returns An object containing user information.
   */
  async validate(payload: any) {
    return { sub: payload.sub, email: payload.email };
  }
}
