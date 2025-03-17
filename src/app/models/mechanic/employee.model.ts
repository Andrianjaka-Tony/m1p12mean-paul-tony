import { User } from '../auth/user.model';
import { Skill } from './skill.model';

export type Employee = {
  _id?: string;
  id_user: User;
  salary: number;
  skills: Skill[];
};
