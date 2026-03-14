import Profile from "../models/Profile.js";


const addressEdit = async (req, res) => {
  try {
    const loggedInUser = req?.user;
    const {id, addressType, landMark, city, state, pinCode, country } = req?.body;

    // validate address id
    if (!id) {
        return res.status(400).json({ message: "Address id is required" });
    }

    // fetch address in db
    const address = await Profile.findOneAndUpdate({userId: loggedInUser._id, "address._id" : id}, {
      $set: {
          "address.$.addressType": addressType,
          "address.$.landMark": landMark,
          "address.$.city": city,
          "address.$.state": state,
          "address.$.pinCode": pinCode,
          "address.$.country": country
        }
    })
    if (!address) {
      return res.status(404).json({ message: "Address not found!" });
    }

    // send response
    res
      .status(200)
      .json({ message: `Successfully updated address`, data: address });
  } catch (err) {
    return res.status(500).json({ message: "Failed to update address!", err});
  }
};

export default addressEdit;