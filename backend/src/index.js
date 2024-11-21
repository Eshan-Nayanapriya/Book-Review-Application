import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import dbConnect from "../src/config/dbConnection.js";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const PORT = process.env.SERVER_PORT || 3001;

app.get("/", (req, res) => {
  res.send({ message: "Server is running at port " + PORT });
});

app.use("/api/user", userRouter);

const startServer = async () => {
  try {
    const dbConnection = await dbConnect();
    if (dbConnection === true) {
      try {
        app.listen(PORT, () => {
          console.info(`🚀 Server is running on port ${PORT}`);
        });
      } catch (error) {
        console.error("❌ Cannot start the server: ", error);
      }
    }
  } catch (error) {
    console.error("❌ Cannot start the server: ", error);
  }
};

startServer();
