import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common'
import { UserService } from '../service/user.service'
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto'

@Controller('users')
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    return await this.userService.create(user)
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.findById(id)
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUser)
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id)
  }
}
