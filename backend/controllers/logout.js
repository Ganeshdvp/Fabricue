
const Logout = async(req, res)=>{
    try {
      // cleanup token in cookie
      res.cookie("token", null, {
        expires: new Date(Date.now()),
      });
      // send response
      res.status(200).json({ message: "logout successfully!" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

export default Logout;