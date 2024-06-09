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
