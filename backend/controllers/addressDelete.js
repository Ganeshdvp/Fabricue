import Profile from "../models/Profile.js";

const addressDelete = async(req, res)=>{
    try{
        const loggedInUser = req?.user;
        const {id} = req?.params;

        // validate and find id in DB
        const address = await Profile.findOneAndUpdate({userId: loggedInUser._id},{
            $pull: {
                address: {_id : id}
            }
        });
        if(!address){
            return res.status(404).json({message: 'Address not found!'});
        }

        // return response
        res.status(200).json({message: 'Successfully deleted address'})
    }
    catch(err){
        return res.status(500).json({message: 'Failed to delete address!'})
    }
}

export default addressDelete;