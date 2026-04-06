import { Request, Response } from "express";
import Product from "../models/Products.js";
import cloudinary from "../utils/cloudinary.js";

interface ReqBody {
  name: string;
  brand: string;
  category: string;
  description: string;
  discountPrice: number;
  price: number;
  subCategory: string;
  stock: number;
  sizes: string[] | string;
  colors: string[] | string;
}


const createProduct = async (req: Request<{}, {}, ReqBody>, res: Response): Promise<void> => {
  try {
    const {
      name,
      brand,
      category,
      description,
      discountPrice,
      price,
      subCategory,
      stock,
      sizes,
      colors,
    } = req?.body;
    const files = req.files as Express.Multer.File[];
    const loggedInUser = req.user;

    // validate
    if (
      !name ||
      !brand ||
      !category ||
      !price ||
      !discountPrice ||
      !subCategory ||
      !stock ||
      !sizes ||
      !colors
    ) {
      res.status(400).json({
        message: "Required fields are missing",
      });
      return;
    }

    if (!loggedInUser) {
      res.status(401).json({
        message: "Unauthorized. Please log in to access this resource.",
      });
      return;
    }
    
    // if the user is a seller
    if (loggedInUser.role !== "seller") {
      res
        .status(403)
        .json({
          message: "Access denied. Only sellers can access this resource.",
        });
      return;
    }

    const categoryCase = category.slice(0).toLowerCase();
    const subCategoryCase =
      subCategory.charAt(0).toUpperCase() + subCategory.slice(1).toLowerCase();

    if (!files || files.length === 0) {
      res.status(400).json({
        message: "Images not found",
      });
      return;
    }

    // HANDLE ARRAY VALUES (FormData fix)
    const parsedSizes = typeof sizes === "string" ? [sizes] : sizes || [];

    const parsedColors = typeof colors === "string" ? [colors] : colors || [];

    // images save in cloudinary
    const uploadedImages = [];

    for (const file of files) {
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

      const result = await cloudinary.uploader.upload(base64, {
        folder: "ProductImages",
      });
      uploadedImages.push(result.secure_url);
    }

    // Create a new product instance
    const newProduct = new Product({
      sellerId: req.user?._id,
      name,
      brand,
      category: categoryCase,
      description,
      discountPrice: Number(discountPrice),
      price: Number(price),
      subCategory: subCategoryCase,
      stock: Number(stock),
      sizes: parsedSizes,
      colors: parsedColors,
      isNewArrival: true,
      image: uploadedImages,
    });

    // save db
    await newProduct.save();

    // Send response
    res
      .status(200)
      .json({ message: "Product created successfully", data: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Error creating product" });
  }
};

export default createProduct;
