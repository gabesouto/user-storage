import {
  Controller,
  UsePipes,
  ValidationPipe,
  Post,
  Body,
} from '@nestjs/common'
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger'
import { CreateStaffDto, ResponseStaffMemberDto } from '@staff/dto/staff.dto'
import { StaffService } from '@staff/service/staff.service'

@ApiTags('Staff')
@Controller('staff')
@UsePipes(ValidationPipe)
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post('create')
  @ApiBody({
    description: 'Staff member details for creating a new staff member',
    type: CreateStaffDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The staff member has been successfully created.',
    type: ResponseStaffMemberDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  async create(@Body() user: CreateStaffDto) {
    return await this.staffService.create(user)
  }
}
