import { Skill } from './skill.model';

export type ServiceCategory = {
  _id?: string;
  label: string;
};

export type Service = {
  _id?: string;
  label: string;
  price: number;
  default_duration: number;
  description: string;
  required_skills: Skill[];
  category: ServiceCategory;
};
