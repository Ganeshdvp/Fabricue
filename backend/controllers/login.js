import { LoginVadlidation } from "../utils/validations.js"
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const Login = async(req, res)=>{
    try {
        const { email, password } = req?.body;
    
        // validations
        LoginVadlidation(email, password);
    
        // find user in db
        const user = await User.findOne({ email });
        if (!user) throw new Error("user not found!");
    
        // compare passwords
        const isPasswordValid = await bcrypt.compare(password, user?.password);
        if (!isPasswordValid) throw new Error("invalid credentials!");
    
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