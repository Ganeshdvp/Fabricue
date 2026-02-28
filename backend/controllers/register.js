import User from "../models/User.js";
import { RegisterVadlidation } from '../utils/validations.js';
import bcrypt from 'bcrypt';

const Register = async(req, res)=>{
    try {
        const { email, password, role } = req?.body;
    
        // validate info
        RegisterVadlidation(req.body);
    
        // find user db
        const isUserExists = await User.findOne({ email });
        if (isUserExists) throw new Error("user is already exists!");
    
        // encrypt password
        const hashPassword = await bcrypt.hash(password, 10);
    
        // creating user model
        const newUser = new User({
          email,
          password: hashPassword,
          role,
          passwordChangedAt: new Date(),
        });
        
        await newUser.save();
    
        res
          .status(200)
          .json({ message: "Registration has been successful!", data: newUser });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}

export default Register;