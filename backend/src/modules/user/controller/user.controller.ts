import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Param, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/user.dto';

@Controller('users')
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post() 
  async create(@Body() user: CreateUserDto) {
    return await this.userService.create(user); 
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.findById(id)
    
  }
  
}