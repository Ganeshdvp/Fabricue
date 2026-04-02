import mongoose, { Document, Model } from "mongoose";
import validator from "validator";

interface userSchemaInterface extends Document {
  fullName: string;
  email: string;
  password: string;
  passwordChangedAt: Date | null;
  role: "seller" | "user";
  failedLoginAttempts: number;
  lockUntil: Date | null;
  isLocked: () => boolean;
}

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true, // auto apply the index
      lowercase: true,
      trim: true,
      validator: {
        validator: (value: string) => {
          if (!validator.isEmail(value)) {
            throw new Error(`${value} is not valid!`);
          }
        },
      },
    },
    password: {
      type: String,
      required: true,
      validator: {
        validator: (value: string) => {
          if (!validator.isStrongPassword(value)) {
            throw new Error(`${value} is weak password!`);
          }
        },
      },
    },
    passwordChangedAt: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      required: true,
      enum: ["seller", "user"],
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

// for rate limiting
userSchema.methods.isLocked = function(): boolean {
    return this.lockUntil && this.lockUntil > Date.now();
}

const User: Model<userSchemaInterface> = mongoose.model<userSchemaInterface>("User", userSchema);

export default User;
  