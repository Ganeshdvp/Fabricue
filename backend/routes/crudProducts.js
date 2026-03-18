import express from 'express';
import roleAuth from '../middlewares/roleAuth.js';
import createProduct from '../controllers/createProduct.js';
import updateProduct from '../controllers/updateProduct.js';
import deleteProduct from '../controllers/deleteProduct.js';
import UserAuth from '../middlewares/UserAuth.js';
import getSellerProducts from '../controllers/sellerProducts.js';
import cloudinary from '../utils/cloudinary.js';
import upload from '../middlewares/uploadImages.js';


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
CRUDProductsRoute.post('/upload', upload.array("images"), async(req, res)=>{
    try{
        const files = req.files;

        if (!files || files.length === 0) {
      return res.status(400).json({
        message: "Images not found",
      });
    }

    const uploadedImages = [];

    for (const file of files) {

      const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

      const result = await cloudinary.uploader.upload(base64, {
        folder: "Images",
      });

      uploadedImages.push(result.secure_url);
    }

    return res.status(200).json({
      message: "Images uploaded successfully",
      images: uploadedImages,
    });

    }
    catch(err){
        return res.status(400).json({message: 'Failed to upload Image!'})
    }
})