export interface ICustomer {
  _id: string;
  name: string;
  email: string;
  vat_number: string;
}

export interface ISite {
  coordinates: {
    latitude: number,
    longitude: number
  };
  address: string;
  post_code: string;
}

export interface IMeter {
  serial_number: number;
  installation_date: string;
}

export interface ICircuit {
  installation_date: string;
  is_main: boolean;
}

export interface INewUser {
  customer: ICustomer,
  site: ISite,
  meter: IMeter,
  circuit: ICircuit
}