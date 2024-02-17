import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import { User } from "../models/user.model";
import { google } from "googleapis";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "http://localhost:3000"
);

// export const createTokens = async (req: Request, res: Response) => {
//   const { code, workspaceId } = req.body;

//   console.log(workspaceId);
//   console.log("Hitting the create token route");
//   console.log(code);

//   try {
//     const { tokens } = await oauth2Client.getToken(code);
//     console.log(tokens);

//     const {
//       access_token,
//       refresh_token,
//       scope,
//       token_type,
//       id_token,
//       expiry_date,
//     } = tokens;

//     const workspace = await WorkspaceModel.findByIdAndUpdate(workspaceId, {
//       accessToken: access_token,
//       refreshToken: refresh_token,
//     });

//     if (!workspace)
//       return res.status(404).json({ message: "Workspace not found" });

//     res.status(200).json({
//       message: "Token Generated",
//       tokens,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

export const oAuthLogin = async (req: Request, res: Response) => {
  try {
    const token = req.body.token;
    console.log(token);

    const google_response = await axios.get(
      "https://people.googleapis.com/v1/people/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          personFields: "emailAddresses,names,photos",
        },
      }
    );

    const data = google_response.data;
    const email = data.emailAddresses[0].value;
    const name = data.names[0].displayName;
    const image = data.photos[0].url;

    const existingUser = await User.findOne({ email });
    const jwt_token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    if (existingUser && existingUser.firstLogin) {
      res.status(200).send({ user: existingUser, token: jwt_token });
      return;
    }

    if (existingUser && !existingUser.firstLogin) {
      await User.findByIdAndUpdate(existingUser._id, {
        name: name,
        profileImage: image,
        firstLogin: true,
      });

      res.status(200).send({ user: existingUser, token: jwt_token });
      return;
    }

    const newUser = await User.create({
      email,
      name,
      password: "",
      profileImage: image,
    });

    await newUser.save();

    res.status(200).send({ user: newUser, token: jwt_token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "OAuth Login Failed" });
  }
};

export const CurrentUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;

    res.status(200).json({ message: "User found", user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const RefreshToken = async (req: Request, res: Response) => {};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const user = await User.findOne({ email: decoded.email });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.body.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.body.user.role))
      return res.status(403).json({ message: "Forbidden" });

    next();
  };
};