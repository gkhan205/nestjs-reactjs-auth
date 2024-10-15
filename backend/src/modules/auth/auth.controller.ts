import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';

import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { LocalAuthGuard } from '@/modules/auth/guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Res() res) {
    const token: Record<string, string> = await this.authService.login(
      req.user,
    );

    return res.status(200).send(token);
  }

  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    return this.authService.registerUser(body);
  }
}
