import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { RequestWithUser } from './interfaces/request-with-user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get roles from metadata if defined on the route
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    // If the route has no @Roles decorator → skip role check, only authentication is required
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    // If no user found (not authenticated) → forbid access
    if (!user) {
      throw new ForbiddenException('Unauthorized');
    }

    // If the user’s role is not in the requiredRoles → forbid access
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        `You need role(s): ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
