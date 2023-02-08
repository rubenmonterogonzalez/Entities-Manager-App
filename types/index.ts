export interface ICustomer {
  id?: string;
  name: string;
  email: string;
  vat_number: string;
}

export interface ISite {
  id?: string;
  name: string;
  address: string;
  post_code: string;
  coordinates: {
    latitude: number,
    longitude: number
  };
  customerId?: number;
}

export interface IMeter {
  id?: string;
  name: string;
  installation_date: Date;
  serial_number: string;
  siteId?: number;
}

export interface ICircuit {
  id?: string;
  name: string;
  installation_date: Date;
  is_main: boolean;
  meterId?: number;
}
