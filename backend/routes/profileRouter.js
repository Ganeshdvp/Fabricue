import express from 'express';
import profile from '../controllers/profile.js';
import UserAuth from '../middlewares/userAuth.js';
import profileEdit from '../controllers/profileEdit.js';
import profileAddAddress from '../controllers/profileAddAddress.js';
import addressEdit from '../controllers/addressEdit.js';
import addressDelete from '../controllers/addressDelete.js';


export const profileRouter = express.Router();

// get profile 
profileRouter.get('/', UserAuth, profile);

// edit profile
profileRouter.patch('/edit', UserAuth, profileEdit);

// add address
profileRouter.post('/address-add', UserAuth, profileAddAddress);

// edit address
profileRouter.patch('/address-edit', UserAuth, addressEdit);

// delete address
profileRouter.delete('/address-delete/:id', UserAuth, addressDelete)