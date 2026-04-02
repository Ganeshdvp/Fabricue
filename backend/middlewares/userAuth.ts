import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { Types } from "mongoose";

interface AuthenticatedRequest extends Request {
  user: {
    _id: Types.ObjectId;
    fullName: string;
    email: string;
    role: "user" | "seller";
    passwordChangedAt?: Date;
    failedLoginAttempts?: number;
    lockUntil?: Date;
    createdAt: Date;
    updatedAt: Date;
  };
}


const UserAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // read token
    const { token } = req.cookies as { token?: string };

    if (!token) {
      res.status(401).json({ message: "Your are not authenticated!" });
      return;
    }

    const JWT_SECRET_CODE = process.env.JWT_SECRET_CODE;

    if (!JWT_SECRET_CODE) {
      throw new Error("JWT_SECRET_CODE is not defined");
    }

    // validate token
    const decoded = jwt.verify(token, JWT_SECRET_CODE);
    const { _id } = decoded as { _id: string };

    if (!decoded) {
      throw new Error("token not valid!");
    }

    // find user
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not Exists!");
    }

    // asign the user!
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      message: err instanceof Error ? err.message : "Internal Server Error!",
    });
  }
};

export default UserAuth;
