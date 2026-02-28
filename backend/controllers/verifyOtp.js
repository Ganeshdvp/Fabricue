import jwt from "jsonwebtoken";


const VerifyOtp = async(req, res)=>{
    try{
        const {token, otp} = req?.body;
    
        // validate otp
        if(!token) throw new Error("Otp not found!");
    
        // decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_CODE);
        if(!decoded) return res.status(400).json({ message: "Failed to verify otp!" });
    
        // checking otp
        if(decoded.otp !== otp) return res.status(400).json({ message: "Invalid OTP" })
    
        // send response
        res.status(200).json({message: 'Otp verified successfully!'})
      }
      catch(err){
        res.status(400).json({message: "OTP expired!"});
      }
}

export default VerifyOtp;