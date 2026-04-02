import { Request, Response } from 'express';
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import { RegisterVadlidation } from '../utils/validations.js';
import bcrypt from 'bcrypt';

interface Reqbody {
    fullName: string;
    email: string;
    password: string;
    role: string;
}

const Register = async(req: Request, res: Response): Promise<void>=>{
    try {
        const { fullName, email, password, role } = req?.body as Reqbody;
    
        // validate info
        RegisterVadlidation(req.body);
    
        // find user db
        const isUserExists = await User.findOne({ email });
        if (isUserExists) throw new Error("user is already exists!");
    
        // encrypt password
        const hashPassword = await bcrypt.hash(password, 10);
    
        // creating user model
        const newUser = new User({
          fullName,
          email,
          password: hashPassword,
          role,
          passwordChangedAt: new Date(),
        });
        
        await newUser.save();

        // create profile model
        const profile = new Profile({
          userId : newUser._id,
        });
        await profile.save()
    
        res
          .status(200)
          .json({ message: "Registration has been successful!", data: newUser });
      } catch (err) {
        res.status(400).json({ message: err instanceof Error ? err.message : 'Unknown error' });
      }
}

export default Register;