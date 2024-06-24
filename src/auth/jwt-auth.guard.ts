import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';

/**
 * Guard to handle JWT authentication.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    /**
   * Handles request authentication.
   * @param err - The error object.
   * @param user - The authenticated user.
   * @param info - Additional info.
   * @param context - The request context.
   * @param status - The status.
   * @returns The user if authentication is successful, otherwise throws an exception.
   */
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('INVALID JWT TOKEN');
    }

    return super.handleRequest(err, user, info, context, status);
  }
}