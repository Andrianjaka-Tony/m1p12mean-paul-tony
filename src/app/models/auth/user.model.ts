import { Role } from './role.model';

export type User = {
  userId?: string;
  lastname: string;
  firstname: string;
  email: string;
  password?: string;
  picture?: string;
  role?: Role;
};
