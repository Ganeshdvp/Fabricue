import express from "express";
import userAuth from "../middlewares/userAuth.js";
import roleAuth from "../middlewares/roleAuth.js";
import Register from "../controllers/register.js";
import Login from "../controllers/login.js";
import Logout from "../controllers/logout.js";
import ChangePassword from "../controllers/changePassword.js";
import SendOtp from "../controllers/sendOtp.js";
import VerifyOtp from "../controllers/verifyOtp.js";


export const authRoute = express.Router();

// register
authRoute.post("/register", Register);

// login
authRoute.post("/login", Login);

// logout
authRoute.post("/logout", userAuth, roleAuth("admin","user"), Logout);

// change password
authRoute.post("/change-password", userAuth, roleAuth("admin", "user"), ChangePassword);

// send otp
authRoute.post('/send-otp', SendOtp);

// verify otp
authRoute.post('/verify-otp', VerifyOtp)