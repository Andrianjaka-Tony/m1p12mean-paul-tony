import { Service } from '../mechanic/services.model';
import { CarFromClient } from './car.model';

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
  status: 'pending' | '';
  begin_at: string | null;
  workers: any[];
  service: Service[];
  quantity: number;
  id_devis: string;
};

export type QuoteFromFind = {
  _id: string;
  services_details: ServiceDetail[];
  price_total: number;
  created_at: string;
  status: 'pending' | '';
  label: string;
  expected_duration: number;
  replies: any[];
  payed: number;
  id_vehicle: CarFromClient;
};
