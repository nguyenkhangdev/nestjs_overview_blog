import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signin(email: string, password: string) {
    //validate user
    const user = await this.userService.findByEmail(email);

    if (!user || user.password !== password) {
      return false;
    }

    return true;
  }
}
