import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import v1Backend01 from "./routes/v1/auth.route.js";
import v1Backend02 from "./routes/v1/admin.route.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./libs/db.js";

const app = express();
app.use(cors({ origin: "http://localhost:3001", credentials: true }));

dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("Backend server for khuchies.supxdevs.com");
});

app.use("/api/v1", v1Backend01);
app.use("/api/v1", v1Backend02);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  connectDB();
});
