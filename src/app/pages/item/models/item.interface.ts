export interface ItemInterface {
  description: string;
  color?: string;
  brand?: string;
  model?: string;
  group?: string;
  price?: number;
  store_link?: string;
  serial_number?: string;
  purchase_date?: {
    $date: Date;
  };
  creation_date?: {
    $date: Date;
  };
  warranty_years?: number;
  home: {
    description: string;
    address?: string;
  };
  room: {
    description: string;
    floor?: number;
  };
  container: {
    description: string;
    color?: string;
  };
  compartment: {
    row: string;
    column: string;
  };
  package?: {
    $oid: string
  }
}