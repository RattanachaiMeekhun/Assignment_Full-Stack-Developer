import { firestore } from "firebase-admin";
import { employeesCollection } from "../config/firestoreCollections";
import { TEmployee, TFilters } from "../types/employeeTypes";
import { transformEmployeeSnapshot } from "../helper/employeeHelper";

export const getEmployees = async () => {
  const employeesSnapshot = await employeesCollection.get();
  const employees: TEmployee[] = transformEmployeeSnapshot(employeesSnapshot);
  return employees;
};

export const createEmployee = async (employeeData: TEmployee) => {
  try {
    const docRef = await employeesCollection.add(employeeData);
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false };
  }
};

export const updateEmployee = async (employeeData: TEmployee) => {
  try {
    await employeesCollection.doc(employeeData.id).update(employeeData);
    return { success: true, id: employeeData.id };
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

export const getDataToExport = async (filters: TFilters) => {
  let query: firestore.Query<firestore.DocumentData> = employeesCollection;
  if (filters.dateofbirth) {
    query = query
      .where("dateofbirth", ">=", filters.dateofbirth[0])
      .where("dateofbirth", "<=", filters.dateofbirth[1]);
  }
  if (filters.dateofexpairy) {
    query = query
      .where("dateofexpairy", ">=", filters.dateofexpairy[0])
      .where("dateofexpairy", "<=", filters.dateofexpairy[1]);
  }
  const employeesSnapshot = await query.get();
  const employees = transformEmployeeSnapshot(employeesSnapshot);
  return employees;
};
