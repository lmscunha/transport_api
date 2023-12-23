export type InputDTO = {
  id?: string;
  licensePlate?: string;
  color?: string;
  brand?: string;
};

export type StorageDTO = {
  licensePlate: string;
  color: string;
  brand: string;
};

export type FilterDTO = {
  color?: string;
  brand?: string;
};
