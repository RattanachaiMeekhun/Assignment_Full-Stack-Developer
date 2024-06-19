import dayjs from "dayjs";

export type TEmployeeDto = {
  id: string;
  dateofbirth: dayjs.Dayjs;
  address: string;
  gender: string;
  province: string;
  surname: string;
  district: string;
  name: string;
  dateofexpairy: dayjs.Dayjs;
  subdistrict: string;
};

export type TEmployeeRequest = {
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
