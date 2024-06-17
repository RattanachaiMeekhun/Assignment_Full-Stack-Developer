import dayjs from "dayjs";

export type TEmployee = {
  id: string;
  dateofbirth: string | dayjs.Dayjs;
  address: string;
  gender: string;
  province: string;
  surname: string;
  district: string;
  name: string;
  dateofexpairy: string | dayjs.Dayjs;
  subdistrict: string;
};
