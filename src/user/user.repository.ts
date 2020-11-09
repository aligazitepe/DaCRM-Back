import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { LoginDto } from '../auth/dto/login.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(RegisterDto: RegisterDto): Promise<User> {
    const { username, password, email, age } = RegisterDto;
    const user = new User();
    user.email = email;
    user.username = username;
    user.age = age;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    const query = this.createQueryBuilder('user');
    query.where('user.email = :email', { email });
    const user = await query.getOne();
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
