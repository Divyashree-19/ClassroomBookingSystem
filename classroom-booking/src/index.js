import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // 👈 Needed to parse JSON body

// routes
import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port", process.env.PORT || 5000);
});
