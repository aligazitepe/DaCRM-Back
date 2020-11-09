import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body(new ValidationPipe({ skipMissingProperties: false }))
    userDetails: LoginDto,
  ): Promise<any> {
    return this.authService.login(userDetails);
  }

  @Post('register')
  async register(
    @Body(new ValidationPipe({ skipMissingProperties: false }))
    userDetails: RegisterDto,
  ): Promise<any> {
    return this.authService.register(userDetails);
  }
}
