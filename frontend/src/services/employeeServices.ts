import {
  TEmployeeDto,
  TEmployeeRequest,
  TFilters,
} from "../types/employeeTypes";

export const getEmployees = async (filters: TFilters) => {
  const response = await fetch("http://localhost:3000/api/employees", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  })
    .then((e) => e.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });

  return response;
};

export const createEmployee = async (formData: TEmployeeRequest) => {
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
      console.error(err);
    });

  return response;
};

export const updateEmployee = async (formData: TEmployeeRequest) => {
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
      console.error(err);
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
      console.error(err);
    });

  return response;
};

export const exportFile = async (filters: TFilters) => {
  const response = await fetch(`http://localhost:3000/api/exportdata`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  });
  if (response.status === 404) {
    return { message: "No data found for the given filters" };
  }

  try {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "employees.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error exporting CSV:", error);
  }
};
