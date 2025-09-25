import { Request } from 'express';
import { RequestUser } from 'src/user/interfaces/request-user.interface';

export interface RequestWithUser extends Request {
  user: RequestUser;
}
