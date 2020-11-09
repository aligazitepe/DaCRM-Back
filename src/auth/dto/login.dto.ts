import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  readonly password: string;
}
