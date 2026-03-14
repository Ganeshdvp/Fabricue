import User from "../models/User.js";

const profileEdit = async (req, res) => {
  try {
    const loggedInUser = req?.user;
    const { fullName, image } = req?.body;

    // find profile db
    const updateUserName = await User.findByIdAndUpdate(
      loggedInUser._id,
      {
        fullName: fullName,
        image: image
      },
      { runValidators: true },
    );
    if (!updateUserName) {
      return res.status(404).json({ message: "User not found!" });
    }

    // send response
    res
      .status(200)
      .json({ message: `Successfully update profile`, data: updateUserName });
  } catch (err) {
    return res.status(500).json({ message: "Failed to update profile!", err});
  }
};

export default profileEdit;
