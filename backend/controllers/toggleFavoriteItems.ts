import { Request, Response } from "express";
import Product from "../models/Products.js";
import Favorite from "../models/Favorite.js";

interface Params {
  type: string;
  id: string;
}

const toggleFavoriteItems = async (req: Request<Params, {}, {}>, res: Response): Promise<void> => {
  try {
    
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized!" });
      return;
    }

    const userId = req.user._id;
    const { type, id } = req.params;

    const isValidType = ["add", "remove"].includes(type);
    if (!isValidType) {
      res.status(400).json({ message: `${type} is not valid!` });
      return;
    }

    const isProductExist = await Product.findById(id);
    if (!isProductExist) {
      res.status(404).json({ message: "Product not found!" });
      return;
    }

    if (type === "add") {
      const alreadyExists = await Favorite.findOne({ userId, productId: id });
      if (alreadyExists) {
        res
          .status(400)
          .json({ message: "Item already exists in favorite!" });
        return;
      }
      await Favorite.create({ userId, productId: id });
    }

    if (type === "remove") {
      const isExists = await Favorite.findOne({ userId, productId: id });
      if (!isExists) {
        res.status(404).json({ message: "Item not found in favorite!" });
        return;
      }
      await isExists.deleteOne();
    }

    res.status(200).json({ message: `Successfully ${type} item in favorite!` });
  } catch (err) {
    res.status(400).json({ message: `Failed to ${type} items!` });
  }
};

export default toggleFavoriteItems;
