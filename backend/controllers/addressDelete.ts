import { Request, Response } from "express";
import Profile from "../models/Profile.js";

interface Params {
  id: string;
}

const addressDelete = async (
  req: Request<Params>,
  res: Response,
): Promise<void> => {
  try {
    const loggedInUser = req.user;
    const { id } = req.params;

    if (!loggedInUser?._id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // validate and find id in DB
    const userId = loggedInUser._id as any;
    const address = await Profile.findOneAndUpdate(
      { userId},
      {
        $pull: {
          address: { _id: id },
        },
      },
    );
    if (!address) {
    res.status(404).json({ message: "Address not found!" });
    return;
    }

    // return response
    res.status(200).json({ message: "Successfully deleted address" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete address!" });
  }
};

export default addressDelete;
