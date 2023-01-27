import { Module } from '@nestjs/common';
import { CurrenciesModule } from '../currencies/currencies.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [CurrenciesModule, UsersModule],
})
export class JobsModule {}
