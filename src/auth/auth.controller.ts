import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

/**
 * Controller to handle authentication-related requests.
 */
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint to log in a user.
   * @param loginUserDto - DTO containing user login details.
   * @returns The access token.
   */
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

   /**
   * Endpoint to register a new user.
   * @param registerUserDto - DTO containing user registration details.
   * @returns The access token.
   */
  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.register(registerUserDto);
  }
}
