export interface ICustomer {
  customerId: number;
  name: string;
  email: string;
  vat_number: string;
}

export interface ISite {
  siteId: number;
  coordinates: {
    latitude: number,
    longitude: number
  };
  address: string;
  post_code: string;
}

export interface IMeter {
  meterId: number;
  serial_number: number;
  installation_date: string;
}

export interface ICircuit {
  circuitId: number;
  installation_date: string;
  is_main: boolean;
}
