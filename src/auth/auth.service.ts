import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginArgs } from './graphql/login-args.type';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<boolean> {
    this.logger.debug(`Validate user ${username}`);
    const user = await this.usersService.findOne(username);
    return user && user.password === pass;
  }

  async login({ username, password }: LoginArgs) {
    this.logger.debug(`Login user ${username}`);
    if (!(await this.validateUser(username, password))) {
      throw new UnauthorizedException();
    }
    const user: any = await this.usersService.findOne(username);
    const payload = { username: user.username, sub: user.Id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
