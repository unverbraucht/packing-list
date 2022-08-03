import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, plaintextPassword: string): Promise<any> {
    const user = await this.usersService.findOneByEmailLean(email);
    if (user) {
      // Only now hash password
      const passwordOk = await compare(plaintextPassword, user.localPassword);
      if (passwordOk) {
        // Don't ever expose local password
        const { localPassword, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    // We only expose the user id and the roles in JWT for now to keep the token small
    const payload = { sub: user._id.toString(), roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload,  { expiresIn: '120m' }),
    };
  }
}