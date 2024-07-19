import { Module } from '@nestjs/common'
import { UsersModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { StaffModule } from '@staff/staff.module'

@Module({
  imports: [UsersModule, AuthModule, StaffModule],
})
export class AppModule {}
