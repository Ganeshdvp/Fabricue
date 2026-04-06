import { Request, Response } from 'express';
import jwt from "jsonwebtoken";

interface Reqbody {
    token: string;
    otp: number;
}

const VerifyOtp = async(req: Request<{}, {}, Reqbody>, res: Response): Promise<void> => {
    try{
        const {token, otp} = req.body;
    
        // validate otp
        if(!token) throw new Error("Otp not found!");
    
        // decode token
        if (!process.env.JWT_SECRET_CODE) {
  res.status(500).json({ message: "Server configuration error" });
  return;
}
        const decoded = jwt.verify(token, process.env.JWT_SECRET_CODE);
        if(!decoded){
          res.status(400).json({ message: "Failed to verify otp!" });
          return;
        }
    
        // checking otp
        if((decoded as any).otp !== otp){
           res.status(400).json({ message: "Invalid OTP" });
          return;
        }
    
        // send response
        res.status(200).json({message: 'Otp verified successfully!'})
      }
      catch(err){
        res.status(400).json({message: "OTP expired!"});
      }
}

export default VerifyOtp;