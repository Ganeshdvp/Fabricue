import User from "../models/User.js";
import uploadProfileImage from './uploadProfileImage.js';
import Profile from '../models/Profile.js';


const profileEdit = async (req, res) => {
  try {
    const loggedInUser = req?.user;
    const fullName = req?.body?.fullName;
    const file = req.file;
    let imageUrl;

    // find profile db
    const profile = await Profile.findOne({userId: loggedInUser._id});
    if(!profile){
      return res.status(404).json({message: 'Profile not found!'});
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
    return res.status(500).json({ message: "Failed to update profile!", err});
  }
};

export default profileEdit;
