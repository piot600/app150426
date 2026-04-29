import { User } from '@prisma/client';
import { UserResponseDto } from './dto/userResponse.dto';

type SafeUser = Pick<
  User,
  'id' | 'email' | 'name' | 'surname' | 'role' | 'createdAt'
>;

export class UserMapper {
  static toResponseDto(user: SafeUser): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      name: user.name,
      surname: user.surname,
    };
  }
}
