import { UserRole } from 'src/user/interfaces/user-role.interface';

export interface JwtPayload {
  sub: number;
  email: string;
  role: UserRole;
}
