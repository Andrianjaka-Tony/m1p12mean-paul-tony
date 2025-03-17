import { User } from '../auth/user.model';

export type Employee = {
  _id?: string;
  id_user: User;
  salary: number;
  skills: string[];
};
