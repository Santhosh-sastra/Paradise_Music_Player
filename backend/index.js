import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import router from "./routes/authRoutes.js";
import songRouter from "./routes/songRoutes.js";

dotenv.config(".env");
const PORT = process.env.PORT || 5001;
const app = express();
app.use(express.json());
//Connect your DataBase
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173", //particularily only this origin can access
    credentials: true,
  }),
);

app.use("/api/auth", router);
app.use("/api/songs", songRouter);
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
