import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/schemas';
import { NOT_AUTHORIZED } from '../messages';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private reflector: Reflector;
  constructor(reflect: Reflector) {
    super();
    this.reflector = reflect;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    await super.canActivate(context);
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException(NOT_AUTHORIZED);
    }
    return user;
  }
}
