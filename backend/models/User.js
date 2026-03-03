import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    email: {
      type: String,
      require: true,
      unique: true, // auto apply the index
      lowercase: true,
      trim: true,
      validator: {
        validator: (value) => {
          if (!validator.isEmail(value)) {
            throw new Error(`${value} is not valid!`);
          }
        },
      },
    },
    password: {
      type: String,
      require: true,
      validator: {
        validator: (value) => {
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
      require: true,
      enum: ["admin", "user"],
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
userSchema.methods.isLocked = function(){
    return this.lockUntil && this.lockUntil > Date.now();
}

const User = mongoose.model("User", userSchema);

export default User;
