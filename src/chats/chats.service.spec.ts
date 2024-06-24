import { Test, TestingModule } from '@nestjs/testing';
import { ChatsService } from './chats.service';
import { ChatsRepository } from './chats.repository';
import { CreateChatDto } from './dto/create-chat.dto';

describe('ChatsService', () => {
  let service: ChatsService;
  let repository: ChatsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatsService,
        {
          provide: ChatsRepository,
          useValue: {
            createChat: jest.fn(),
            findAllChats: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ChatsService>(ChatsService);
    repository = module.get<ChatsRepository>(ChatsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createChat', () => {
    it('should create a new chat', async () => {
      // Mock data
      const createChatDto: CreateChatDto = {
        members: ['user1', 'user2'],
      };

      // Mock repository method
      const mockCreatedChat = { _id: 'some-id', ...createChatDto };
      jest.spyOn(repository, 'createChat').mockResolvedValue(mockCreatedChat);

      // Call service method
      const createdChat = await service.createChat(createChatDto);

      // Assertions
      expect(createdChat).toEqual(mockCreatedChat);
      expect(repository.createChat).toHaveBeenCalledWith(createChatDto);
    });
  });

  describe('findAllChats', () => {
    it('should find all chats for a user ID', async () => {
      // Mock data
      const userId = 'user1';
      const mockChats = [
        { _id: 'chat1', members: ['user1', 'user2'] },
        { _id: 'chat2', members: ['user1', 'user3'] },
      ];

      // Mock repository method
      jest.spyOn(repository, 'findAllChats').mockResolvedValue(mockChats);

      // Call service method
      const foundChats = await service.findAllChats(userId);

      // Assertions
      expect(foundChats).toEqual(mockChats);
      expect(repository.findAllChats).toHaveBeenCalledWith(userId);
    });
  });
});
