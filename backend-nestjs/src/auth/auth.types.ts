import { Role } from '@prisma/client';

export type AuthUser = {
  userId: number;
  email: string;
  role: Role;
};

export interface AuthRequest extends Request {
  user: AuthUser;
}

export type Payload = {
  sub: number;
  email: string;
  role: Role;
};
