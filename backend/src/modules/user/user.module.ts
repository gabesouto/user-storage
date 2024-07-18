import { PrismaModule } from '@database//prisma.module'
import { ExcludeService } from '@helpers/exclude.service'
import { forwardRef, Module } from '@nestjs/common'
import { AuthModule } from 'modules/auth/auth.module'
import { UserController } from './controller/user.controller'
import { UserService } from './service/user.service'

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, ExcludeService],
  exports: [UserService],
})
export class UsersModule {}
