import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { hashPassword } from '../utils';

const oneUser = {
  username: 'username#1',
  password: hashPassword('password#1'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        AuthService,
        JwtStrategy,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(oneUser),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser()', () => {
    it('should return false when credentials are invalid', async () => {
      const res = await service.validateUser('guest', 'guest');
      expect(res).toBeFalsy();
    });
  });

  describe('validateUser()', () => {
    it('should return true when credentials are valid', async () => {
      const res = await service.validateUser('username#1', 'password#1');
      expect(res).toBeTruthy();
    });
  });

  describe('login()', () => {
    it('should return JWT object when credentials are valid', async () => {
      const res = await service.login({
        username: 'username#1',
        password: 'password#1',
      });
      expect(res.access_token).toBeDefined();
    });
  });
});
