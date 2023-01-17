export interface ICustomer {
  _id?: string;
  name: string;
  email: string;
  vat_number: string;
  coordinates: ICoordinates;
  address: string;
  post_code: string;
  serial_number: number;
  installation_date: string;
  is_main: boolean;
}

export interface ICoordinates {
  lat: number;
  long: number;
}