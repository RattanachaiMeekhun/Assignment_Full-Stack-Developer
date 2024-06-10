export type Province = {
  id: number;
  name: string;
  districts: District[];
};

export type District = {
  id: number;
  name: string;
  subdistricts: SubDistrict[];
};

export type SubDistrict = {
  id: number;
  name: string;
};
