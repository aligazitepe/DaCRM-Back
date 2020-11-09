import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { RegisterDto } from '../auth/dto/register.dto';
import { User } from './user.entity';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async signUp(userDetails: RegisterDto): Promise<User> {
    return this.userRepository.createUser(userDetails);
  }
  async validateUserPassword(loginDto: LoginDto): Promise<LoginDto> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOneByEmail(email);
    await user.validatePassword(password);
    return user;
  }
}
