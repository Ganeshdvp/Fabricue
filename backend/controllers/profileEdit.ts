import { Request, Response } from 'express';
import User from "../models/User.js";
import uploadProfileImage from './uploadProfileImage.js';
import Profile from '../models/Profile.js';

interface Reqbody {
  fullName: string;
}

const profileEdit = async (req: Request<{}, {}, Reqbody>, res: Response): Promise<void> => {
  try {
    const loggedInUser = req.user;
    const fullName = req.body?.fullName;
    const file = req.file;
    let imageUrl;

    // check if user is logged in
    if (!loggedInUser) {
      res.status(401).json({ message: 'Unauthorized! Please log in to edit your profile.' });
      return;
    }

    // find profile db
    const profile = await Profile.findOne({userId: loggedInUser._id});
    if(!profile){
      res.status(404).json({message: 'Profile not found!'});
      return;
    }

    // upload image only if user selected one
    if (file) {
      imageUrl = await uploadProfileImage(file);
      profile.image = imageUrl
    }

     // update user name
    if (fullName) {
      await User.findByIdAndUpdate(loggedInUser._id, { fullName });
    }
    await profile.save();
    
    // send response
    res
      .status(200)
      .json({ message: `Successfully updated profile` });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile!", err});
    return;
  }
};

export default profileEdit;
