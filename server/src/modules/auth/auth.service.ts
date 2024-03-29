import { Injectable } from '@nestjs/common';
import { SignInDto } from './schemas/signInSchema';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userData: SignInDto) {
    const user = await this.userService.getByLogin(userData.login);

    if (
      !user ||
      (user && !bcrypt.compareSync(userData.password, user.password))
    ) {
      return null;
    }

    const { id, login } = user;

    return { id, login };
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { username: user.login, sub: user.id };

    return {
      acess_token: this.jwtService.sign(payload),
    };
  }
}
