import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/user.dto';

@Controller('users')
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post() 
  async create(@Body() user: CreateUserDto) {
    return await this.userService.post(user); 
  }
}