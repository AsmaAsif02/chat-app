import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import * as bcrypt from 'bcrypt';

/**
 * Service to handle authentication-related business logic.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

   /**
   * Validates a user's credentials.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns The user if validation is successful, otherwise throws an exception.
   */
  async validateUser(email, password): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
  }

   /**
   * Logs in a user and returns a JWT token.
   * @param loginUserDto - DTO containing user login details.
   * @returns The access token.
   */
  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );

    if (user) {
      const payload = {
        email: user.email,
        sub: user._id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }

   /**
   * Registers a new user and returns a JWT token.
   * @param registerUserDto - DTO containing user registration details.
   * @returns The access token.
   */
  async register(registerUserDto: RegisterUserDto) {
    const user = await this.usersService.findOne(registerUserDto.email);
    if (user) {
      throw new HttpException(
        'User with this email exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltOrRounds);
    const createOne = await this.usersService.createOne({
      ...registerUserDto,
      password: hash,
    });
    if (createOne) {
      const payload = {
        email: createOne.email,
        sub: createOne._id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
