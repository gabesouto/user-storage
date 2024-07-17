import { Module } from '@nestjs/common'
import { UserService } from '../user/service/user.service'
import { UserController } from './controller/user.controller'
import { ExcludeService } from './helpers/exclude.service'
import { PrismaModule } from 'src/database/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, ExcludeService],
})
export class UsersModule {}
