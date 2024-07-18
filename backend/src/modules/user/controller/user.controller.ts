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
import { AuthGuard } from 'src/modules/auth/guards/auth.guard'
import { RoleGuard } from 'src/modules/auth/guards/role.guard'

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

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.findOne(id)
  }

  @UseGuards(AuthGuard)
  @Get('/find')
  async findByEmail(@Body() email: string) {
    return await this.userService.findByEmail(email)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUser)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id)
  }
}
