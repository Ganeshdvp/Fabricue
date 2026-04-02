import { Request, Response } from "express";

const checkCookie = async (req: Request, res: Response): Promise<void> => {
    try {
        const loggedInUser = req?.user;

         if(!loggedInUser){
             res.status(401).json({message:'No user found!'});
             return;
         }
    // send response
    res.status(200).json({message: 'User found successfully!', data: loggedInUser});

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user!" });
  }
}

export default checkCookie;