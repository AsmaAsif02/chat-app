import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDo } from 'src/_schemas/user.do';

/**
 * Repository to handle database operations for users.
 */
export class UsersRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDo>,
  ) {}

   /**
   * Finds a user by their email.
   * @param email - The email of the user to find.
   * @returns The found user or null if not found.
   */
  async findOne(email): Promise<any> {
    const findOne = await this.userModel.findOne({ email: email });
    return findOne;
  }

  /**
   * Creates a new user in the database.
   * @param user - The user details to create.
   * @returns The created user.
   */
  async createOne(user): Promise<any> {
    const createOne = await this.userModel.create(user);
    return createOne;
  }
}
