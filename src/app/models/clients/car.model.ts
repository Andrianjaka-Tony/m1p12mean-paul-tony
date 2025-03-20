import { User } from '../auth/user.model';
import { Brand } from './brand.model';
import { CarType } from './car-type.model';

export type CarFromForm = {
  id_type_vehicle: string;
  id_brand_vehicle: string;
  id_client: string;
  registration_number: string;
  year: number;
  model: string;
};

export type CarFromClient = {
  _id: string;
  id_type_vehicle: CarType;
  id_brand_vehicle: Brand;
  id_client: User & { _id: string };
  registration_number: string;
  year: number;
  model: string;
};
