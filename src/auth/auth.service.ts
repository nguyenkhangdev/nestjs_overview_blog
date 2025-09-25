import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(email: string, password: string) {
    //validate user
    const user = await this.userService.findByEmail(email);

    if (!user || user.password !== password) {
      return false;
    }
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    //return jwt token
    const jwtToken = this.jwtService.sign(payload);
    return jwtToken;
  }
}
