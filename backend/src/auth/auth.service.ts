import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string , user_data: { id: number, email: string, role: string } }> {
    const user = await this.usersService.findOneByEmail(email);
    const bcrypt = require('bcrypt');

    let correctPassword = await bcrypt.compare(pass, user?.password);  

    if ( !correctPassword || !user) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    };
    return {
      user_data: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      access_token: await this.jwtService.signAsync(payload),
    };
  }

}
