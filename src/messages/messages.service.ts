import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  /**
   * Creates a new message.
   * @param createMessageDto - DTO containing message details.
   * @returns The created message.
   */
  async createMessage(createMessageDto: CreateMessageDto) {
    return await this.messagesRepository.createMessage(createMessageDto);
  }

   /**
   * Finds all messages for a given chat ID.
   * @param id - The chat ID.
   * @returns All messages for the chat ID.
   */
  async findAllMessages(id: string) {
    return await this.messagesRepository.findAllMessages(id);
  }
}
