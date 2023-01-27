import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginType } from './graphql/login.type';
import { LoginArgs } from './graphql/login-args.type';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginType)
  async login(@Args() loginArgs: LoginArgs) {
    return this.authService.login(loginArgs);
  }
}
