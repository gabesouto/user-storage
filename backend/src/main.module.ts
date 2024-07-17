import { Module } from '@nestjs/common';
import { UserController } from './modules/user/controller/user.controller';
import { UserService } from './modules/user/service/user.service'
import { PrismaService } from './database/prisma.service';
import { ExcludeService } from './modules/user/helpers/exclude.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, ExcludeService],
})
export class AppModule {}
