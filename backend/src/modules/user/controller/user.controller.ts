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
  ParseIntPipe,
  DefaultValuePipe,
  Query,
  UseGuards,
} from '@nestjs/common'
import { UserService } from '../service/user.service'
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto'
import { AuthGuard } from 'src/modules/auth/auth.guard'
import { RoleGuard } from 'src/modules/auth/role.guard'

@Controller('users')
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() user: CreateUserDto) {
    return await this.userService.create(user)
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    return this.userService.findAll(page, limit)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.findOne(id)
  }

  @Get('/find')
  async findByEmail(@Body() email: string) {
    return await this.userService.findByEmail(email)
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUser)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id)
  }
}
