import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { comparePassword } from '@/common/utils/password-utils';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { User } from '@/modules/users/user.schema';
import { UsersService } from '@/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user: User = await this.usersService.findByEmail(email);

    if (user && (await comparePassword(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: any) {
    return this.createToken(user);
  }

  async registerUser(_user: CreateUserDto) {
    const newUser = await this.usersService.create(_user);
    return this.createToken(newUser);
  }

  private createToken(user: any) {
    const payload = { email: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
