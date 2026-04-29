import {
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserResponseDto } from './dto/userResponse.dto';
import { UserService } from './user.service';
import { UserMapper } from './user.mapper';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import type { AuthRequest } from 'src/auth/auth.types';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get('all')
  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userService.allUsers();
    return users.map((user) => UserMapper.toResponseDto(user));
  }

  @Get('profile')
  async getMyProfile(@Req() req: AuthRequest): Promise<UserResponseDto> {
    const user = await this.userService.findById(req.user.userId);
    if (!user) throw new NotFoundException();

    return UserMapper.toResponseDto(user);
  }
}
