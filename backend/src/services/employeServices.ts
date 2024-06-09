import { employeesCollection } from "../config/firestoreCollections";
import { TEmployee } from "../types/employeeTypes";

export const getEmployees = async () => {
  const employeesSnapshot = await employeesCollection.get();
  const employees: TEmployee[] = [];
  employeesSnapshot.forEach((doc) => {
    employees.push(doc.data() as TEmployee);
  });
  return employees;
};

export const getEmployeeByBirthdate = async (dateofbirth: string) => {
  const employeesSnapshot = await employeesCollection
    .where("dateofbirth", "==", dateofbirth)
    .get();
  if (!employeesSnapshot.empty) {
    return employeesSnapshot.docs[0].data() as TEmployee;
  }
  return null;
};
