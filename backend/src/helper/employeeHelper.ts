import { firestore } from "firebase-admin";
import { TEmployeeDto } from "../types/employeeTypes";

export const transformEmployeeSnapshot = (
  employeesSnapshot: firestore.QuerySnapshot<
    firestore.DocumentData,
    firestore.DocumentData
  >
) => {
  const employees: TEmployeeDto[] = [];
  employeesSnapshot.forEach((doc) => {
    let data = doc.data();

    if (data.dateofbirth && data.dateofbirth instanceof firestore.Timestamp) {
      data.dateofbirth = data.dateofbirth.toDate();
    }
    if (
      data.dateofexpairy &&
      data.dateofexpairy instanceof firestore.Timestamp
    ) {
      data.dateofexpairy = data.dateofexpairy.toDate();
    }

    const empData: TEmployeeDto = { id: doc.id, ...(data as any) };
    employees.push(empData);
  });
  return employees;
};
