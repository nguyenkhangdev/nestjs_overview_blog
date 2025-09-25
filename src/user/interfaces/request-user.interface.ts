import { UserRole } from './user-role.interface';

export interface RequestUser {
  id: number;
  email: string;
  role: UserRole;
}
