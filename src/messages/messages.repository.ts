import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageDo } from 'src/_schemas/message.do';

export class MessagesRepository {
  constructor(
    @InjectModel('Message')
    private messageModel: Model<MessageDo>,
  ) {}

   /**
   * Creates a new message in the database.
   * @param message - The message details.
   * @returns The created message.
   */
  async createMessage(message): Promise<any> {
    const createOne = await this.messageModel.create(message);
    return createOne;
  }

   /**
   * Finds all messages for a given chat ID.
   * @param id - The chat ID.
   * @returns All messages for the chat ID.
   */
  async findAllMessages(id): Promise<any> {
    const findAll = await this.messageModel.find({ chat_id: { $all: [id] } });
    return findAll;
  }
}
