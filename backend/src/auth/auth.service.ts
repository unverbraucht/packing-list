import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

import { saltRounds } from './constants';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, plaintextPassword: string): Promise<any> {
    const user = await this.usersService.findOneByEmailLean(email);
    if (user) {
      // Only now hash password
      // const hashedPw = await hash(plaintextPassword, saltRounds);
      const passwordOk = await compare(plaintextPassword, user.localPassword);
      if (passwordOk) {
        const { localPassword, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user._id.toString(), roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}