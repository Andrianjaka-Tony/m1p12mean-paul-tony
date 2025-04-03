import { Employee } from '../mechanic/employee.model';
import { Service } from '../mechanic/services.model';
import { CarFromClient } from './car.model';

export type Status = 'pending' | 'accepted' | 'in_progress' | 'completed' | '';

export type QuoteAdd = {
  services: {
    id: string;
    quantity: number;
  }[];
  created_at: string;
  id_client: string;
  id_vehicle: string;
  label: string;
};

export type ServiceDetail = {
  _id: string;
  status: Status;
  begin_at: string | null;
  workers: Employee[];
  service: Service;
  quantity: number;
  id_devis: string;
};

export type QuoteFromFind = {
  _id: string;
  services_details: ServiceDetail[];
  price_total: number;
  created_at: string;
  status: Status;
  label: string;
  expected_duration: number;
  replies: any[];
  payed: number;
  id_vehicle: CarFromClient;
  id_client: {
    email: string;
    firstname: string;
    lastname: string;
    picture: string;
    _id: string;
  };
};
