import express from "express";
import employeeRoutes from "./routes/employeeRoutes";
import mstDataRoutes from "./routes/mstDataRoutes";
const cors = require("cors");

export const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Update this to match your frontend's origin
  })
);
app.use("/api", employeeRoutes);
app.use("/api", mstDataRoutes);
