import { Request, Response } from "express";
import Profile from "../models/Profile.js";

interface ReqBody {
  id: string;
  addressType: string;
  landMark: string;
  city: string;
  state: string;
  pinCode: number;
  country: string;
}

const addressEdit = async (req: Request<{}, {}, ReqBody>, res: Response): Promise<void> => {
  try {
    const loggedInUser = req.user;
    const {id, addressType, landMark, city, state, pinCode, country } = req.body;

    if(!loggedInUser){
      res.status(401).json({ message: "Unauthorized!" });
      return;
    }

    // validate address id
    if (!id) {
        res.status(400).json({ message: "Address id is required" });
        return;
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
      res.status(404).json({ message: "Address not found!" });
      return;
    }

    // send response
    res
      .status(200)
      .json({ message: `Successfully updated address`, data: address });
  } catch (err) {
    res.status(500).json({ message: "Failed to update address!", err});
  }
};

export default addressEdit;