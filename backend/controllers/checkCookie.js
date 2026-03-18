

const checkCookie = async (req, res)=>{
    try {
        const loggedIn = req?.user;
         if(!loggedIn){
            return res.status(401).json({message:'No user found!'});
         }
    // send response
    res.status(200).json({message: 'User found successfully!', data: loggedIn});

  } catch (err) {
    return res.status(400).json({ message: "Failed to fetch user!" });
  }
}

export default checkCookie;