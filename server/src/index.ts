import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./utils/mongoose";
// import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// const limiter = rateLimit({
//     windowMs: 60 * 60 * 1000,
//     max: 100,
//     message: "Too many requests from this IP, please try again in an hour",
// });

// Connect MongoDB Database
connectDB();

// Start the  server
app.listen(5000, () => console.log("Server listening on port 5000"));