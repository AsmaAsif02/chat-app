import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

/**
 * Controller to handle user-related requests.
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
