export interface ICustomer {
  id?: string;
  name: string;
  email: string;
  vat_number: string;
  data: ICustomer;
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
  customerId?: string | string[];
}

export interface IMeter {
  id?: string;
  name: string;
  installation_date: string;
  serial_number: string;
  siteId?: string | string[];
}

export interface ICircuit {
  id?: string;
  name: string;
  installation_date: string;
  is_main: boolean;
  meterId?: string | string[];
}
