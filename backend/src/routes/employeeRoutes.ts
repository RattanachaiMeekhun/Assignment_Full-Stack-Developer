import express, { Request, Response } from "express";
import {
  getEmployeeByBirthdate,
  getEmployees,
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
        res.status(404).json(responseData);
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
