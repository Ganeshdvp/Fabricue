import { Request, Response } from 'express';
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import {sendEmail} from "../utils/sendEmail.js";

interface Reqbody {
  email: string;
}

// generate otp
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const SendOtp = async(req: Request, res: Response): Promise<void>=>{
    try{
        const {email} = req?.body as Reqbody;
    
        // validate email
        const isUserExists = await User.findOne({email});
        if(!isUserExists) throw new Error("User not found!");
    
        // generate otp
        const otp: string = generateOTP();
    
        // create jwt token
        const token = jwt.sign({email,otp}, process.env.JWT_SECRET_CODE, {
          expiresIn: "5m"
        });
    
        // send otp to mail
        await sendEmail(email, otp);
    
        // send response
        res.status(200).json({message: 'OTP sent to mail successfully!', data: token})
      }
      catch(err){
        res.status(400).json({ message: err instanceof Error ? err.message : "Error sending OTP" });
      }
}

export default SendOtp;