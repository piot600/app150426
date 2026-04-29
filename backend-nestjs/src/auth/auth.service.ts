import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { Payload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(input: LoginDto) {
    const user = await this.userService.findByEmail(input.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const ok = await bcrypt.compare(input.password, user.password);
    if (!ok) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '20s',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '1m',
    });

    const hashed = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateRefreshToken(user.id, hashed);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async register(input: RegisterDto) {
    const isExists = await this.userService.findByEmail(input.email);

    if (isExists) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    await this.userService.create({
      email: input.email,
      password: hashedPassword,
      name: input.name,
      surname: input.surname,
    });

    return { message: `User created successfully` };
  }

  async refresh(token: string) {
    try {
      const payload: Payload = this.jwtService.verify(token);

      const user = await this.userService.findById(payload.sub);
      if (!user || !user.refreshToken) {
        throw new UnauthorizedException();
      }

      const isMatch = await bcrypt.compare(token, user.refreshToken);
      if (!isMatch) {
        throw new UnauthorizedException();
      }

      const newPayload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      const newAccessToken = this.jwtService.sign(newPayload, {
        expiresIn: '20s',
      });

      const newRefreshToken = this.jwtService.sign(newPayload, {
        expiresIn: '1m',
      });

      const hashed = await bcrypt.hash(newRefreshToken, 10);
      await this.userService.updateRefreshToken(user.id, hashed);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: number) {
    await this.userService.updateRefreshToken(userId, null);
    return { message: `You have successfully logged out` };
  }
}
