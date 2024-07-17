import { Module } from '@nestjs/common'
import { UsersModule } from './modules/user/user.module'

@Module({
  imports: [UsersModule],
})
export class AppModule {}
