import express from 'express';
import roleAuth from '../middlewares/roleAuth.js';
import createProduct from '../controllers/createProduct.js';
import updateProduct from '../controllers/updateProduct.js';
import deleteProduct from '../controllers/deleteProduct.js';
import UserAuth from '../middlewares/UserAuth.js';
import getSellerProducts from '../controllers/sellerProducts.js';
import cloudinary from '../utils/cloudinary.js';


export const CRUDProductsRoute = express.Router();

// Create product
CRUDProductsRoute.post('/createProduct', UserAuth, roleAuth("seller"), createProduct);

// Update product
CRUDProductsRoute.patch('/updateProduct/:id', UserAuth, roleAuth("seller"), updateProduct);

// Delete product
CRUDProductsRoute.delete('/deleteProduct/:id', UserAuth, roleAuth("seller"), deleteProduct);

// GET all products by SellerId
CRUDProductsRoute.get('/allProducts', UserAuth, roleAuth("seller"), getSellerProducts);

// upload image
// CRUDProductsRoute.post('/upload', async(req, res)=>{
//     try{
//         const images = req?.body?.images;

//         console.log(images)

//         if(!images){
//             return res.status(404).json({message: 'Image not found!'})
//         }

//         // cloudinary upload
//         const uploadResult = await cloudinary.uploader
//        .upload(
//            images, {
//                public_id: 'shoes',
//            }
//        )

//        console.log(uploadResult);

//        // return
//        res.status(200).json({message: 'Image Uploaded successfully!'})

//     }
//     catch(err){
//         console.log(err)
//         return res.status(400).json({message: 'Failed to upload Image!'})
//     }
// })