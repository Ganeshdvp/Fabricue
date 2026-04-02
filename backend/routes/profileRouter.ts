import express, { RequestHandler, Router } from 'express';
import profile from '../controllers/profile.js';
import UserAuth from '../middlewares/userAuth.js';
import profileEdit from '../controllers/profileEdit.js';
import profileAddAddress from '../controllers/profileAddAddress.js';
import addressEdit from '../controllers/addressEdit.js';
import addressDelete from '../controllers/addressDelete.js';
import upload from '../middlewares/uploadImages.js';


export const profileRouter: Router = express.Router();

// get profile 
profileRouter.get('/', UserAuth as RequestHandler, profile);

// edit profile
profileRouter.patch('/edit', UserAuth as RequestHandler, upload.single("image"), profileEdit);

// add address
profileRouter.post('/address-add', UserAuth as RequestHandler, profileAddAddress);

// edit address
profileRouter.patch('/address-edit', UserAuth as RequestHandler, addressEdit);

// delete address
profileRouter.delete('/address-delete/:id', UserAuth as RequestHandler, addressDelete);