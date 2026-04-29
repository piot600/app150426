import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import type { AuthRequest } from './auth.types';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('refresh')
  refresh(@Req() req: Request) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const token = authHeader.split(' ')[1];

    return this.authService.refresh(token);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req: AuthRequest) {
    return this.authService.logout(req.user.userId);
  }

  @Get('currentUser')
  @UseGuards(JwtAuthGuard)
  currentUser(@Req() req: AuthRequest) {
    return req.user;
  }
}
