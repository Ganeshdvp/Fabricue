import {
  differenceInDays,
} from "date-fns";
import bcrypt from "bcrypt";



const ChangePassword = async(req, res)=>{
    try {
          const { password } = req?.body;
          const loggedInUser = req?.user;
    
          // restricted password modification
          if (loggedInUser.passwordChangedAt) {
            const days = differenceInDays(
              new Date(),
              loggedInUser?.passwordChangedAt,
            );
            if (days < 7) {
              throw new Error("You can change password only after 7 days");
            }
          }
    
          // encrypt password
          const hashPassword = await bcrypt.hash(password, 10);
    
          // replace new password on old password
          loggedInUser.password = hashPassword;
          loggedInUser.passwordChangedAt = new Date();
    
          await loggedInUser.save();
          res
            .status(200)
            .json({ message: "password has been updated successfully!" });
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
}

export default ChangePassword;