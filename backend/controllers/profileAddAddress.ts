import { Request, Response } from 'express';
import Profile from "../models/Profile.js";

interface Reqbody {
  addressType: string;
  landMark: string;
  city: string;
  state: string;
  pinCode: number;
  country: string;
}

const profileAddAddress = async (req: Request<{}, {}, Reqbody>, res: Response): Promise<void> => {
  try {
    const loggedInUser = req.user;
    const { addressType, landMark, city, state, pinCode, country } = req.body;

    // check if user is logged in
    if(!loggedInUser) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    // validate
    if (!addressType || !landMark || !city || !state || !pinCode || !country) {
      res.status(400).json({
        message: "Required address fields missing",
      });
      return;
    }

    // find profile from db
    let profile = await Profile.findOne({ userId: loggedInUser._id as any});
    if (!profile) {
      res.status(404).json({ message: "Profile not found!" });
      return;
    };

    if (!profile.address) {
      profile.address = [];
    }

    // limit address before inserting
    if (profile.address.length >= 5) {
      res.status(400).json({
        message: "Maximum 5 addresses allowed",
      });
      return;
    }

    const newAddress = {
      addressType,
      landMark,
      city,
      state,
      pinCode,
      country,
    };

    profile.address.push(newAddress as any);

    await profile.save();

    // send response
    res.status(200).json({ message: "Address added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add address!" });
    return;
  }
};

export default profileAddAddress;
