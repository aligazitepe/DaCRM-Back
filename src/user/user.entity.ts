import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { NotAcceptableException } from '@nestjs/common';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  age: number;

  @Column()
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    try {
      const hash = await bcrypt.hash(password, this.salt);
      return hash === this.password;
    } catch (e) {
      throw new NotAcceptableException('Username and password does not match!');
    }
  }
}
