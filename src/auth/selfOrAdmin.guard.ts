import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { UserRole } from 'src/user/interfaces/user-role.interface';

@Injectable()
export class SelfOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;
    const targetUserId = parseInt(request.params.id, 10);

    if (!user) {
      throw new ForbiddenException('Unauthorized');
    }
    if (user.role === UserRole.ADMIN) {
      return true;
    }

    if (user.id !== targetUserId) {
      throw new ForbiddenException('You can only access your own data');
    }
    return true;
  }
}
