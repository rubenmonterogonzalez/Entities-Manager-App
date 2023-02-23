export interface ICustomer {
  customerId?: string | number;
  name: string;
  email: string;
  vat_number: string;
  data: ICustomer;
}

export interface ISite {
  siteId?: string | number;
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
  meterId?: string | number;
  name: string;
  installation_date: string;
  serial_number: string;
  siteId?: string | string[];
}

export interface ICircuit {
  circuitId?: string | number;
  name: string;
  installation_date: string;
  is_main: boolean;
  meterId?: string | string[];
}
