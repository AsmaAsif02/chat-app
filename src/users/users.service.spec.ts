import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            findOne: jest.fn(),
            createOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should find a user by username (email)', async () => {
      const username = 'asma@example.com';
      const mockUser = { email: username, password: '123' };
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser);
      const foundUser = await service.findOne(username);
      expect(foundUser).toBeDefined();
      expect(foundUser.email).toEqual(username);
      expect(foundUser.password).toEqual(mockUser.password);
    });

    it('should return null if user is not found', async () => {
      const username = 'deep@gmail.com';
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      const foundUser = await service.findOne(username);
      expect(foundUser).toBeNull();
    });
  });

  describe('createOne', () => {
    it('should create a new user', async () => {
      const newUser = { email: 'abd@gmail.com', password: 'abc' };
      const mockCreatedUser = { _id: 'some-id', email: newUser.email };

      jest.spyOn(repository, 'createOne').mockResolvedValue(mockCreatedUser);

      const createdUser = await service.createOne(newUser);

      expect(createdUser).toBeDefined();
      expect(createdUser.email).toEqual(newUser.email);
      expect(createdUser.password).toBeUndefined(); // Ensure password is not exposed in the response
    });
  });
});
