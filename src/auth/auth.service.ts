import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    await this.userService.validateUserPassword(loginDto);
    return {
      access_token: this.jwtService.sign(loginDto),
    };
  }

  async register(userDetails: RegisterDto): Promise<User> {
    return this.userService.signUp(userDetails);
  }
}
