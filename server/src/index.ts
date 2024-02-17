import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./utils/mongoose";
import subjectRouter from "./routes/subject";

import authRouter from "./routes/route";
import userRouter from "./routes/user";

// import rateLimit from "express-rate-limit";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// const limiter = rateLimit({
//     windowMs: 60 * 60 * 1000,
//     max: 100,
//     message: "Too many requests from this IP, please try again in an hour",
// });

app.use("/api/subject", subjectRouter);
// Routes
app.use("/auth", authRouter);
app.use("/user", userRouter);

// Connect MongoDB Database
connectDB();

// Start the  server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
