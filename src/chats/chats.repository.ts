import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatDo } from 'src/_schemas/chat.do';

export class ChatsRepository {
  constructor(
    @InjectModel('Chat')
    private chatModel: Model<ChatDo>,
  ) {}

  /**
   * Creates a new chat in the database.
   * @param chat - The chat details.
   * @returns The created chat.
   */
  async createChat(chat): Promise<any> {
    const createOne = await this.chatModel.create(chat);
    return createOne;
  }

   /**
   * Finds all chats for a given user ID.
   * @param id - The user ID.
   * @returns All chats for the user ID.
   */
  async findAllChats(id): Promise<any> {
    const findAll = await this.chatModel.find({ members: { $all: [id] } });
    return findAll;
  }
}
