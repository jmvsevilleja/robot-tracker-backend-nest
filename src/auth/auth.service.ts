import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await compare(password, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserById(id: string): Promise<User> {
    const user = await this.usersService.findById(id);
    if (user) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<{ token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
