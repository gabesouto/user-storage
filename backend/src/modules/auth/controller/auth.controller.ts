import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from '../service/auth.service'
import { ApiTags } from '@nestjs/swagger'
import { LoginDto } from '@auth/dto/auth.dto'

@ApiTags('Auth')
@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginPayload: LoginDto) {
    return await this.authService.login(loginPayload)
  }
}
