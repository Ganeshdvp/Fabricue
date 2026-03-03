import { LoginVadlidation } from "../utils/validations.js"
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// rate limit
const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000;  // 15 minutes

const Login = async(req, res)=>{
    try {
        const { email, password } = req?.body;
    
        // validations
        LoginVadlidation(email, password);
    
        // find user in db
        const user = await User.findOne({ email });
        if (!user) throw new Error("user not found!");

        // rate limit by using credentials
        if(user.isLocked()){
          return res.status(403).json({message: 'Account locked. Try again later!'})
        }
    
        // compare passwords
        const isPasswordValid = await bcrypt.compare(password, user?.password);
        if (!isPasswordValid){
          user.failedLoginAttempts += 1;
          if(user.failedLoginAttempts >= MAX_ATTEMPTS){
            user.lockUntil = Date.now() + LOCK_TIME;
          }
          await user.save();

          return res.status(400).json({message: 'Invalid credentials'});

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
        res.status(400).json({ message: err.message });
      }
}
export default Login;