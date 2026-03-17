import {
  differenceInDays,
} from "date-fns";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { PasswordValid } from '../utils/validations.js';


const ChangePassword = async(req, res)=>{
    try {
          const { password, email } = req?.body;

          // validate email
          if(!email){
            return res.status(404).json({message: 'Email is required!'});
          }

          // validate password
          PasswordValid(password);

          // find email
          const user = await User.findOne({email: email});
          if(!user){
            return res.status(404).json({message: 'User not found!'});
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
          res.status(400).json({ message: err.message });
        }
}

export default ChangePassword;