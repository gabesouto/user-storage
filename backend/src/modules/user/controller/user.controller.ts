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

@ApiTags('users')
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
    description: 'Search users with a common property (e.g., "role:admin")',
    example: 'role:admin',
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
    example: '550e8400-e29b-41d4-a716-446655440000',
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

  @Post('/find')
  @ApiBody({
    description: 'Email to search for a user',
    type: String,
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
  async findByEmail(@Body() email: string) {
    return await this.userService.findByEmail(email)
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier of the user to be updated',
    example: '550e8400-e29b-41d4-a716-446655440000',
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
    example: '550e8400-e29b-41d4-a716-446655440000',
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
