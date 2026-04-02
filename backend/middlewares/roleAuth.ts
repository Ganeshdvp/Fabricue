import { Request, Response, NextFunction } from "express";

const roleAuth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!roles.includes(req.user?.role as string)) {
      res.status(403).json({ message: "Access denied!" });
      return;
    }
    next();
  };
};

export default roleAuth;