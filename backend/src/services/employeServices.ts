import { employeesCollection } from "../config/firestoreCollections";
import { TEmployee } from "../types/employeeTypes";

export const getEmployees = async () => {
  const employeesSnapshot = await employeesCollection.get();
  const employees: TEmployee[] = [];
  employeesSnapshot.forEach((doc) => {
    const empData: TEmployee = { id: doc.id, ...(doc.data() as any) };
    employees.push(empData);
  });
  return employees;
};

export const getEmployeeByBirthdate = async (dateofbirth: string) => {
  const employeesSnapshot = await employeesCollection
    .where("dateofbirth", ">=", dateofbirth)
    .where("dateofbirth", "<=", dateofbirth)
    .get();
  if (!employeesSnapshot.empty) {
    return employeesSnapshot.docs[0].data() as TEmployee;
  }
  return null;
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
