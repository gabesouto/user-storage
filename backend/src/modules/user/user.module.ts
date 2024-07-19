import { PrismaModule } from '@database/prisma.module'
import { ExcludeService } from '@helpers/exclude.service'
import { forwardRef, Module } from '@nestjs/common'
import { UserController } from './controller/user.controller'
import { AuthModule } from '@auth/auth.module'
import { UserService } from '@user/service/user.service'
import { StaffModule } from '@staff/staff.module'

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule), StaffModule],
  controllers: [UserController],
  providers: [UserService, ExcludeService],
  exports: [UserService],
})
export class UsersModule {}
