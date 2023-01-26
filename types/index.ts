export interface ICustomer {
  _id: string;
  customerId: number;
  name: string;
  email: string;
  vat_number: string;
}

export interface ISite {
  _id: string;
  siteId: number;
  coordinates: {
    latitude: number,
    longitude: number
  };
  address: string;
  post_code: string;
}

export interface IMeter {
  _id: string;
  meterId: number;
  serial_number: number;
  installation_date: string;
}

export interface ICircuit {
  _id: string;
  circuitId: number;
  installation_date: string;
  is_main: boolean;
}
