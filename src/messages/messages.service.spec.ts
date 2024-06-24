import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';
import { CreateMessageDto } from './dto/create-message.dto';

describe('MessagesService', () => {
  let service: MessagesService;
  let repository: MessagesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: MessagesRepository,
          useValue: {
            createMessage: jest.fn(),
            findAllMessages: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    repository = module.get<MessagesRepository>(MessagesRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMessage', () => {
    it('should create a new message', async () => {
      // Mock data
      const createMessageDto: CreateMessageDto = {
        chat_id: '66790cf22e5870a10504dd8e',
        sender_id: '66790c662e5870a10504dd88',
        receiver_id: '66790ca62e5870a10504dd8c',
        message: 'Tell me your age?',
      };

      // Mock repository method to resolve with a created message
      jest.spyOn(repository, 'createMessage').mockResolvedValue(createMessageDto);

      // Call the service method
      const createdMessage = await service.createMessage(createMessageDto);

      // Assertions
      expect(createdMessage).toEqual(createMessageDto);
      expect(repository.createMessage).toHaveBeenCalledWith(createMessageDto);
    });
  });

  describe('findAllMessages', () => {
    it('should find all messages for a chat ID', async () => {
      // Mock data
      const chatId = '66790cf22e5870a10504dd8e';
      const mockMessages = [
        { id: '1', chat_id: chatId, sender_id: 'sender1', receiver_id: 'receiver1', message: 'Message 1' },
        { id: '2', chat_id: chatId, sender_id: 'sender2', receiver_id: 'receiver2', message: 'Message 2' },
      ];

      // Mock repository method to resolve with messages
      jest.spyOn(repository, 'findAllMessages').mockResolvedValue(mockMessages);

      // Call the service method
      const foundMessages = await service.findAllMessages(chatId);

      // Assertions
      expect(foundMessages).toEqual(mockMessages);
      expect(repository.findAllMessages).toHaveBeenCalledWith(chatId);
    });
  });

});
