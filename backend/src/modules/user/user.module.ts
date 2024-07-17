import { forwardRef, Module } from '@nestjs/common'
import { UserService } from '../user/service/user.service'
import { UserController } from './controller/user.controller'
import { ExcludeService } from './helpers/exclude.service'
import { PrismaModule } from '../database/prisma.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, ExcludeService],
  exports: [UserService],
})
export class UsersModule {}
