export type TEmployee = {
  id: string;
  dateofbirth: Date;
  address: string;
  gender: string;
  province: string;
  surname: string;
  district: string;
  name: string;
  dateofexpairy: Date;
  subdistrict: string;
};

export type TFilters = {
  dateofbirth: string[];
  dateofexpairy: string[];
};
