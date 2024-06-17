import express, { Request, Response } from "express";
import {
  createEmployee,
  delEmployee,
  getEmployeeByBirthdate,
  getEmployees,
  updateEmployee,
} from "../services/employeServices";

const router = express.Router();

router.get("/employees", async (req: Request, res: Response) => {
  try {
    const responseData = await getEmployees();
    res.json(responseData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get(
  "/employees/dateofbirth/:dateofbirth",
  async (req: Request, res: Response) => {
    const dateofbirth = req.params.dateofbirth;

    try {
      const responseData = await getEmployeeByBirthdate(dateofbirth);

      if (responseData) {
        res.status(200).json(responseData);
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post("/createemployee", async (req: Request, res: Response) => {
  try {
    const result = await createEmployee(req.body);
    if (result.success) {
      res
        .status(201)
        .json({ message: "Employee added successfully", id: result.id });
    } else {
      res.status(500).json({ message: "Failed to add employee" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/updateemployee", async (req: Request, res: Response) => {
  try {
    const result = await updateEmployee(req.body);
    if (result.success) {
      res
        .status(201)
        .json({ message: "Employee added successfully", id: result.id });
    } else {
      res.status(500).json({ message: "Failed to update employee" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/delemployee/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await delEmployee(id);
    if (result.success) {
      res
        .status(201)
        .json({ message: "Employee deleted successfully", id: result.id });
    } else {
      res.status(500).json({ message: "Failed to deleted employee" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
