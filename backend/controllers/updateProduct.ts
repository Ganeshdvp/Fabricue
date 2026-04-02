import { Request, Response } from "express";
import Product from "../models/Products.js";
import cloudinary from "../utils/cloudinary.js";

interface Params {
  id: string;
}

interface Reqbody {
  name?: string;
  brand?: string;
  category?: string;
  description?: string;
  discountPrice?: number;
  price?: number;
  subCategory?: string;
  stock?: number;
  sizes?: string[] | string;
  colors?: string[] | string;
  image?: string[];
}

const updateProduct = async (req: Request<Params, {}, Reqbody>, res: Response): Promise<void> => {
  try {
    const loggedInUser = req.user;
    const { id } = req.params;

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
    } = req.body;

    const files = req.files;

    // authorization check
    if(!loggedInUser) {
      res
        .status(401)
        .json({ message: "Unauthorized. Please log in to access this resource." });
      return;
    }

    if (loggedInUser.role !== "seller") {
      res
        .status(403)
        .json({
          message: "Access denied. Only sellers can access this resource.",
        });
      return;
    }

    // category formatting
    const categoryCase = category
      ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
      : undefined;

    const subCategoryCase = subCategory
      ? subCategory.charAt(0).toUpperCase() + subCategory.slice(1).toLowerCase()
      : undefined;

    // array handling
    const parsedSizes = typeof sizes === "string" ? [sizes] : sizes || [];

    const parsedColors = typeof colors === "string" ? [colors] : colors || [];

    // upload images ONLY if provided
    const uploadedImages = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
          "base64",
        )}`;

        const result = await cloudinary.uploader.upload(base64, {
          folder: "ProductImages",
        });

        uploadedImages.push(result.secure_url);
      }
    }

    const existingProduct = await Product.findById(id);

    // update object
    const updateData = {
      name,
      brand,
      category: categoryCase,
      subCategory: subCategoryCase,
      description,
      discountPrice: Number(discountPrice),
      price: Number(price),
      stock: Number(stock),
      sizes: parsedSizes,
      colors: parsedColors,
    };

    // only update images if new ones uploaded
    if (uploadedImages.length > 0) {
      updateData.image = [...existingProduct.image, ...uploadedImages];
    }

    // update DB
    const product = await Product.findOneAndUpdate(
      { _id: id, sellerId: loggedInUser._id },
      { $set: updateData },
      { new: true },
    );

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating product",
      error: err instanceof Error ? err.message : String(err),
    });
  }
};

export default updateProduct;
