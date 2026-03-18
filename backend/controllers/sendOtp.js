import User from "../models/User.js";
import jwt from "jsonwebtoken";
import {sendEmail} from "../utils/sendEmail.js";

// generate otp
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const SendOtp = async(req, res)=>{
    try{
        const {email} = req?.body;
    
        // validate email
        const isUserExists = await User.findOne({email});
        if(!isUserExists) throw new Error("User not found!");
    
        // generate otp
        const otp = generateOTP();
    
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
        res.status(400).json({ message: err.message });
      }
}

export default SendOtp;