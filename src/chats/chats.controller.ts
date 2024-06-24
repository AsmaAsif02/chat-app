import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { ApiTags, ApiResponse , ApiBearerAuth} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth('access-token')
@ApiTags('chats')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  /**
   * Endpoint to create a new chat.
   * @param createChatDto - DTO containing chat details.
   * @returns The created chat.
   */
  @UseGuards(JwtAuthGuard)
  @Post('create-chat')
  @ApiResponse({
    status: 201,
    description: 'The chat has been successfully created.',
  })
  async createChat(@Body() createChatDto: CreateChatDto) {
    return await this.chatsService.createChat(createChatDto);
  }

  /**
   * Endpoint to get all chats by user ID.
   * @param id - The user ID.
   * @returns All chats for the given user ID.
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getAllChatsByUserId(@Param(':id') id: string) {
    return await this.chatsService.findAllChats(id);
  }
}
