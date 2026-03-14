import Profile from "../models/Profile.js";

const profileAddAddress = async (req, res) => {
  try {
    const loggedInUser = req?.user;
    const { addressType, landMark, city, state, pinCode, country } = req?.body;

    // validate
    if (!addressType || !landMark || !city || !state || !pinCode || !country) {
      return res.status(400).json({
        message: "Required address fields missing",
      });
    }

    // find profile from db
    let profile = await Profile.findOne({ userId: loggedInUser._id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found!" });
    };

    if (!profile.address) {
      profile.address = [];
    }

    // limit address before inserting
    if (profile.address.length >= 5) {
      return res.status(400).json({
        message: "Maximum 5 addresses allowed",
      });
    }

    const newAddress = {
      addressType,
      landMark,
      city,
      state,
      pinCode,
      country,
    };

    profile.address.push(newAddress);

    await profile.save();

    // send response
    res.status(200).json({ message: "Address added successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to add address!" });
  }
};

export default profileAddAddress;
