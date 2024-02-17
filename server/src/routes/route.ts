import express from "express";
import { CurrentUser, oAuthLogin, protect } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/google/callback", oAuthLogin);
authRouter.get("/current-user", protect, CurrentUser);

export default authRouter;