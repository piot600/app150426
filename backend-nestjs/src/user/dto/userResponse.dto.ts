import { Role } from '@prisma/client';

export class UserResponseDto {
  id!: number;
  email!: string;
  name!: string;
  surname!: string;
  role!: Role;
  createdAt!: Date;
}
