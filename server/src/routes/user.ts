import express from "express";
import { protect } from "../controllers/auth.controller";
import { getMyProfile } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/me", protect, getMyProfile);

export default userRouter;