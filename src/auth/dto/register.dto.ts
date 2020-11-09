import {
  IsEmail,
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  readonly email: string;

  @MinLength(2)
  @MaxLength(30)
  readonly username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  readonly password: string;

  @IsNumber()
  readonly age: number;
}
