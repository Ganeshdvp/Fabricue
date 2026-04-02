import { Request, Response } from 'express';
import Profile from "../models/Profile.js";


const profile = async (req: Request, res: Response): Promise<void> => {
    try {
        const loggedInUser = req?.user;

        // check if user is logged in
        if (!loggedInUser) {
            res.status(401).json({ message: "Unauthorized!" });
            return;
        }

        // fetch orders from db
        const profile = await Profile.find({
            userId : loggedInUser._id
        }).populate('userId', 'fullName email')
        if(!profile || !profile.length){
            res.status(404).json({message: 'Profile not found!'});
            return;
        }

    // send response
    res.status(200).json({message: `Successfully fetch profile`, data: profile});

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile!" });
    return;
  }
}

export default profile;