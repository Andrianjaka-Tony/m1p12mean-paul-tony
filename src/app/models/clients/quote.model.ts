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
