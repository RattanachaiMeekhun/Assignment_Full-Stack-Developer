import { firestore } from "firebase-admin";
import { employeesCollection } from "../config/firestoreCollections";
import {
  TEmployeeDto,
  TEmployeeRequest,
  TFilters,
} from "../types/employeeTypes";
import { transformEmployeeSnapshot } from "../helper/employeeHelper";

export const getEmployees = async () => {
  const employeesSnapshot = await employeesCollection.get();
  const employees: TEmployeeDto[] =
    transformEmployeeSnapshot(employeesSnapshot);
  return employees;
};

export const createEmployee = async (employeeData: TEmployeeDto) => {
  try {
    const docRef = await employeesCollection.add(employeeData);
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false };
  }
};

export const updateEmployee = async (employeeData: TEmployeeDto) => {
  try {
    let updateData: TEmployeeRequest = {
      id: employeeData.id,
      dateofbirth: firestore.Timestamp.fromDate(
        new Date(employeeData.dateofbirth)
      ),
      address: employeeData.address,
      gender: employeeData.gender,
      province: employeeData.province,
      surname: employeeData.surname,
      district: employeeData.district,
      name: employeeData.name,
      dateofexpairy: firestore.Timestamp.fromDate(
        new Date(employeeData.dateofexpairy)
      ),
      subdistrict: employeeData.subdistrict,
    };

    await employeesCollection.doc(updateData.id).update(updateData);
    return { success: true, id: updateData.id };
  } catch (error) {
    return { success: false };
  }
};

export const delEmployee = async (id: string) => {
  try {
    await employeesCollection.doc(id).delete();
    return { success: true, id: id };
  } catch (error) {
    return { success: false };
  }
};

export const getFiltedData = async (filters: TFilters) => {
  let query: firestore.Query<firestore.DocumentData> = employeesCollection;
  if (filters.dateofbirth) {
    const startDate = new Date(filters.dateofbirth[0]);
    const endDate = new Date(filters.dateofbirth[1]);

    if (
      startDate.toString() !== "Invalid Date" &&
      endDate.toString() !== "Invalid Date"
    ) {
      query = query
        .where("dateofbirth", ">", firestore.Timestamp.fromDate(startDate))
        .where("dateofbirth", "<", firestore.Timestamp.fromDate(endDate));
    }
  }
  if (filters.dateofexpairy) {
    const startDate = new Date(filters.dateofexpairy[0]);
    const endDate = new Date(filters.dateofexpairy[1]);

    query = query
      .where("dateofbirth", ">", firestore.Timestamp.fromDate(startDate))
      .where("dateofbirth", "<", firestore.Timestamp.fromDate(endDate));
  }

  const employeesSnapshot = await query.get();
  if (!employeesSnapshot.empty) {
    const employees = transformEmployeeSnapshot(employeesSnapshot);
    return employees;
  }

  return [];
};
