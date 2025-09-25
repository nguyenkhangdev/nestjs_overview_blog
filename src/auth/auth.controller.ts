import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() signInDto: SignInDto) {
    const token = await this.authService.signin(
      signInDto.email,
      signInDto.password,
    );
    if (!token) {
      return { success: false, message: 'Invalid credentials' };
    }

    return {
      success: true,
      access_token: token,
    };
  }
}
