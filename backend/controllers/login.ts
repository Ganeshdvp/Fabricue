import { Request, Response } from 'express';
import { LoginVadlidation } from "../utils/validations.js"
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface ReqBody {
  email: string;
  password: string;
}

// rate limit
const MAX_ATTEMPTS: number = 5;
const LOCK_TIME: number = 15 * 60 * 1000;  // 15 minutes

const Login = async(req: Request<{}, {}, ReqBody>, res: Response): Promise<void> =>{
    try {
        const { email, password } = req.body;
    
        // validations
        LoginVadlidation(email, password);
    
        // find user in db
        const user = await User.findOne({ email });
        if (!user) throw new Error("user not found!");

        // rate limit by using credentials
        if(user.isLocked()){
          res.status(403).json({message: 'Account locked. Try again later!'});
          return;
        }
    
        // compare passwords
        const isPasswordValid = await bcrypt.compare(password, user?.password);
        if (!isPasswordValid){
          user.failedLoginAttempts += 1;
          if(user.failedLoginAttempts >= MAX_ATTEMPTS){
            user.lockUntil = Date.now() + LOCK_TIME;
          }
          await user.save();

          res.status(400).json({message: 'Invalid credentials'});
          return;
        };

          // reset rate limit
          user.failedLoginAttempts = 0;
          user.lockUntil = null;
          await user.save();

    
        // create jwt
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_CODE, {
          expiresIn: "1d",
        });
        // store it in cookie
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
        });
    
        // send response
        res.json({ message: "Login Successfull", data: user });
      } catch (err) {
        res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
      }
}
export default Login;