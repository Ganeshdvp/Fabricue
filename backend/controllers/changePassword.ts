import { Request, Response } from "express";
import {
  differenceInDays,
} from "date-fns";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { PasswordValid } from '../utils/validations.js';

interface ReqBody {
  password: string;
  email: string;
}

const ChangePassword = async(req: Request<{}, {}, ReqBody>, res: Response): Promise<void> => {
    try {
          const { password, email } = req?.body;

          // validate email
          if(!email){
             res.status(404).json({message: 'Email is required!'});
             return;
          }

          // validate password
          PasswordValid(password);

          // find email
          const user = await User.findOne({email: email});
          if(!user){
             res.status(404).json({message: 'User not found!'});
             return;
          }
    
          // restricted password modification
          if (user.passwordChangedAt) {
            const days = differenceInDays(
              new Date(),
              user?.passwordChangedAt,
            );
            if (days < 7) {
              throw new Error("You can change password only after 7 days");
            }
          }
    
          // encrypt password
          const hashPassword = await bcrypt.hash(password, 10);
    
          // replace new password on old password
          user.password = hashPassword;
          user.passwordChangedAt = new Date();
    
          // save in db
          await user.save();

          // return response
          res
            .status(200)
            .json({ message: "password has been updated successfully!" });

        } catch (err) {
          res.status(500).json({ message: err instanceof Error ? err.message : "Internal Server Error" });
        }
}

export default ChangePassword;