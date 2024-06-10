import express, { Request, Response } from "express";
import { getProvinceData } from "../services/mstDataServices";

const router = express.Router();

router.get("/getProvinceData", async (req: Request, res: Response) => {
  try {
    const responseData = await getProvinceData();
    res.json(responseData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
export default router;
