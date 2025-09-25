import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { RequestWithUser } from './interfaces/request-with-user.interface';

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

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: RequestWithUser) {
    return req.user;
  }
}
