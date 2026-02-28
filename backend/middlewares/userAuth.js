import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const UserAuth = async(req, res, next)=>{
    try{
        // read token
        const {token} = req.cookies;

        if(!token){
            return res.status(401).json({message: "Your are not authenticated!"});
        }

        // validate token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_CODE);
    const {_id} = decoded;

      if(!decoded){
        throw new Error("token not valid!");
    }

     // find user
    const user = await User.findById(_id);
    if(!user){
        throw new Error("User not Exists!");
    }

    // asign the user!
    req.user = user;
    next();

    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

export default UserAuth;