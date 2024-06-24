import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatsRepository } from './chats.repository';

@Injectable()
export class ChatsService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  /**
   * Creates a new chat.
   * @param createChatDto - DTO containing chat details.
   * @returns The created chat.
   */
  async createChat(createChatDto: CreateChatDto) {
    return await this.chatsRepository.createChat(createChatDto);
  }

  /**
   * Finds all chats for a given user ID.
   * @param id - The user ID.
   * @returns All chats for the user ID.
   */
  async findAllChats(id: string) {
    return await this.chatsRepository.findAllChats(id);
  }
}
