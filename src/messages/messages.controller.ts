import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiTags, ApiResponse , ApiBearerAuth} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth('access-token')
@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

   /**
   * Endpoint to create a new message.
   * @param createMessageDto - DTO containing message details.
   * @returns The created message.
   */
  @UseGuards(JwtAuthGuard)
  @Post('create-message')
  @ApiResponse({
    status: 201,
    description: 'The message has been successfully created.',
  })
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return await this.messagesService.createMessage(createMessageDto);
  }

    /**
   * Endpoint to get all messages by chat ID.
   * @param id - The chat ID.
   * @returns All messages for the given chat ID.
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getAllMessagesByChatId(@Param('id') id: string) {
    return await this.messagesService.findAllMessages(id);
  }
}
