import { firestore } from "firebase-admin";

export type TEmployee = {
  dateofbirth: string;
  address: string;
  gender: string;
  province: string;
  surname: string;
  district: string;
  name: string;
  dateofexpairy: firestore.Timestamp;
  canton: string;
};
