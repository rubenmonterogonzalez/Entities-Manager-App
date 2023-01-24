export interface ICustomer {
  _id: string;
  name: string;
  email: string;
  vat_number: string;
}

export interface ISite {
  _id: string;
  coordinates: {
    latitude: number,
    longitude: number
  };
  address: string;
  post_code: string;
}

export interface IMeter {
  _id: string;
  serial_number: number;
  installation_date: string;
}

export interface ICircuit {
  _id: string;
  installation_date: string;
  is_main: boolean;
}
