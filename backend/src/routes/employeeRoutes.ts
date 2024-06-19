import express, { Request, Response } from "express";
import {
  createEmployee,
  delEmployee,
  getFiltedData,
  updateEmployee,
} from "../services/employeServices";
import { TFilters } from "../types/employeeTypes";
const { Parser } = require("json2csv");

const router = express.Router();

router.post("/employees", async (req: Request, res: Response) => {
  try {
    const filters: TFilters = req.body || {};
    const responseData = await getFiltedData(filters);

    res.status(200).json(responseData);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error" });
  }
});

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

router.post("/exportdata", async (req: Request, res: Response) => {
  const filters: TFilters = req.body || {};
  const responseData = await getFiltedData(filters);

  if (responseData.length > 0) {
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(responseData);

    res.header("Content-Type", "text/csv");
    res.attachment("employees.csv");
    res.send(csv);
  } else {
    return res.status(404).json({ message: "No data found." });
  }
});

export default router;
