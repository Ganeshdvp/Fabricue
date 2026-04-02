import { Request, Response } from 'express';

const Logout = async(req: Request, res: Response): Promise<void> => {
    try {
      // cleanup token in cookie
      res.cookie("token", null, {
        expires: new Date(Date.now()),
      });
      // send response
      res.status(200).json({ message: "logout successfully!" });
    } catch (err) {
      res.status(500).json({ message: err instanceof Error ? err.message : 'Internal Server Error' });
    }
  }

export default Logout;