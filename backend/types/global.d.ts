import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: Types.ObjectId;
        fullName: string;
        email: string;
        role: string;
        passwordChangedAt?: Date;
        failedLoginAttempts?: number;
        lockUntil?: Date;
        createdAt: Date;
        updatedAt: Date;
      };
      files?: Express.Multer.File[];
      file?: Express.Multer.File;
    }
  }
}

export {};