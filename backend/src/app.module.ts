import { Module } from '@nestjs/common';
import { UserController } from '../src/modules/user/controller/user.controller';
import { UserService } from '../src/modules/user/service/user.service'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
