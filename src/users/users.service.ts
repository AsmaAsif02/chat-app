import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

/**
 * Service to handle business logic for user-related operations.
 */
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

   /**
   * Finds a user by their username.
   * @param username - The username of the user to find.
   * @returns The found user or null.
   */
  async findOne(username): Promise<any> {
    return this.usersRepository.findOne(username);
  }

   /**
   * Creates a new user.
   * @param user - The user details to create.
   * @returns The created user.
   */
  async createOne(user): Promise<any> {
    const createOne = await this.usersRepository.createOne(user);
    return createOne;
  }
}
