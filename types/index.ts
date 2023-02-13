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
  customerId?: string;
}

export interface IMeter {
  id?: string;
  name: string;
  installation_date: string;
  serial_number: string;
  siteId?: string;
}

export interface ICircuit {
  id?: string;
  name: string;
  installation_date: string;
  is_main: boolean;
  meterId?: string;
}
