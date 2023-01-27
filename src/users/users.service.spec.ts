import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { hashPassword } from '../utils';

const userArray = [
  {
    username: 'username#1',
    password: hashPassword('password#1'),
  },
  {
    username: 'username#2',
    password: hashPassword('password#2'),
  },
];

const oneUser = {
  username: 'username#1',
  password: hashPassword('password#1'),
};

describe('UserService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(oneUser),
            create: jest.fn().mockResolvedValue(oneUser),
            save: jest.fn().mockResolvedValue(oneUser),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      const oneUser = {
        username: 'username#1',
        password: hashPassword('password#1'),
      };

      expect(
        service.create({
          username: 'username#1',
          password: hashPassword('password#1'),
        }),
      ).resolves.toEqual(oneUser);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      expect(service.findOne('username#1')).resolves.toEqual(oneUser);
      expect(repoSpy).toBeCalledWith({ username: 'username#1' });
    });
  });
});
