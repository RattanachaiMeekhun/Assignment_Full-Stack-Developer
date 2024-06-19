import { firestore } from "firebase-admin";

export type TEmployeeDto = {
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

export type TEmployeeRequest = {
  id: string;
  dateofbirth: firestore.Timestamp;
  address: string;
  gender: string;
  province: string;
  surname: string;
  district: string;
  name: string;
  dateofexpairy: firestore.Timestamp;
  subdistrict: string;
};

export type TFilters = {
  dateofbirth: string[];
  dateofexpairy: string[];
};
