import { TEmployee } from "../types/employeeTypes";

export const getEmployees = async () => {
  const response = await fetch("http://localhost:3000/api/employees")
    .then((e) => e.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const createEmployee = async (formData: TEmployee) => {
  const response = await fetch("http://localhost:3000/api/createemployee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((e) => e.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const updateEmployee = async (formData: TEmployee) => {
  const response = await fetch("http://localhost:3000/api/updateEmployee", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((e) => e.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const delEmployee = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/delemployee/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((e) => e.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};
