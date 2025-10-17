import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import v1 from "./routes/v1/index.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./libs/db.js";

const app = express();
app.use(cors({ origin: "http://localhost:3001", credentials: true }));

dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("Backend server for be.khuchies.supxdevs.com");
});

app.use("/api/v1", v1);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  connectDB();
});
