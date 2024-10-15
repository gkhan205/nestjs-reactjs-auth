import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '@/modules/auth/auth.service';
import { User } from '@/modules/users/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<Partial<User>> {
    const user: Omit<User, 'password'> = await this.authService.validateUser(
      email,
      password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
