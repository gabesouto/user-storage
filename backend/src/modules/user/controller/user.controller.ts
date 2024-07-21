import { AuthGuard } from '@auth/guards/auth.guard'
import { RoleGuard } from '@auth/guards/role.guard'

import {
  Controller,
  UsePipes,
  ValidationPipe,
  Post,
  Body,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common'
import {
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiQuery,
  ApiSecurity,
  ApiParam,
} from '@nestjs/swagger'
import {
  CreateUserDto,
  ResponseUserDto,
  UpdateUserDto,
} from '@user/dto/user.dto'
import { UserService } from '@user/service/user.service'

@ApiTags('Users')
@Controller('users')
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiBody({
    description: 'User details for creating a new user',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: ResponseUserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  @ApiSecurity('bearer')
  @UseGuards(AuthGuard, RoleGuard)
  async create(@Body() user: CreateUserDto) {
    return await this.userService.create(user)
  }

  @Get()
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number (optional, default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Limit of items per page (optional, default: 5)',
    example: 5,
  })
  @ApiQuery({
    name: 'filter',
    type: String,
    required: false,
    description: 'Search users with a common property (e.g., "age:26")',
    example: 'age:26',
  })
  @ApiSecurity('bearer')
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: [ResponseUserDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access',
  })
  @UseGuards(AuthGuard)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('filter') filter: string,
  ) {
    return this.userService.findAll(page, limit, filter)
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier of the user',
    example: 'b1d5f6a0-4736-4b8f-8d3c-b4a4d5e77bde',
  })
  @ApiResponse({
    status: 200,
    description: 'User details',
    type: ResponseUserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiSecurity('bearer')
  @UseGuards(AuthGuard)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.findOne(id)
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier of the user to be updated',
    example: 'b1d5f6a0-4736-4b8f-8d3c-b4a4d5e77bde',
  })
  @ApiBody({
    description: 'User details to be updated',
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiSecurity('bearer')
  @UseGuards(AuthGuard, RoleGuard)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUser)
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier of the user to be deleted',
    example: 'b1d5f6a0-4736-4b8f-8d3c-b4a4d5e77bde',
  })
  @ApiResponse({
    status: 204,
    description: 'User successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiSecurity('bearer')
  @UseGuards(AuthGuard, RoleGuard)
  @HttpCode(204)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id)
  }
}
