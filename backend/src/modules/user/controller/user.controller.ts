import { AuthGuard } from '@auth/guards/auth.guard'
import { RoleGuard } from '@auth/guards/role.guard'
import {
  Controller,
  UsePipes,
  ValidationPipe,
  Post,
  Body,
  Get,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from '@user/dto/user.dto'
import { UserService } from '@user/service/user.service'

@Controller('users')
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() user: CreateUserDto) {
    return await this.userService.create(user)
  }

  @Get()
  @UseGuards(AuthGuard)
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
