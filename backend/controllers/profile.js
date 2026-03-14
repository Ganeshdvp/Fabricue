import Profile from "../models/Profile.js";


const profile = async (req, res)=>{
    try {
        const loggedInUser = req?.user;

        // fetch orders from db
        const profile = await Profile.find({
            userId : loggedInUser._id
        }).populate('userId', 'fullName email')
        if(!profile || !profile.length){
            return res.status(404).json({message: 'Profile not found!'});
        }

    // send response
    res.status(200).json({message: `Successfully fetch profile`, data: profile});

  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch profile!" });
  }
}

export default profile;