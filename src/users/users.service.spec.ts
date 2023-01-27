import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it.each`
    name       | returnVal
    ${'guest'} | ${{ id: 1, username: 'guest', password: 'guest' }}
  `(
    'should call findOne for $name and return $returnVal',
    async ({ name, returnVal }: { name: string; returnVal: UserDto }) => {
      expect(await service.findOne(name)).toEqual(returnVal);
    },
  );
});
