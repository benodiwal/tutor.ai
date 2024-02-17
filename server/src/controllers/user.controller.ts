import { Request, Response } from "express";

export const getMyProfile = async (req: Request, res: Response) => {
    try {
      const user = req.body.user;
  
      res.status(200).json({ message: "User found", user });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
};