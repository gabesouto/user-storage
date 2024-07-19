import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from '../service/auth.service'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { LoginDto } from '@auth/dto/auth.dto'

@ApiTags('Auth')
@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 200, description: 'Successful login' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({
    description: 'Staff member email and password',
    type: LoginDto,
  })
  @Post('login')
  async login(@Body() loginPayload: LoginDto) {
    return await this.authService.login(loginPayload)
  }
}
