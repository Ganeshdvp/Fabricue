import Product from "../models/Products.js";
import Favorite from "../models/Favorite.js";

const toggleFavoriteItems = async (req, res) => {
  try {
    const userId = req.user._id;
    const { type, id } = req.params;

    const isValidType = ["add", "remove"].includes(type);
    if (!isValidType) {
      return res.status(400).json({ message: `${type} is not valid!` });
    }

    const isProductExist = await Product.findById(id);
    if (!isProductExist) {
      return res.status(404).json({ message: "Product not found!" });
    }

    if (type === "add") {
      const alreadyExists = await Favorite.findOne({ userId, productId: id });
      if (alreadyExists) {
        return res
          .status(400)
          .json({ message: "Item already exists in favorite!" });
      }
      await Favorite.create({ userId, productId: id });
    }

    if (type === "remove") {
      const isExists = await Favorite.findOne({ userId, productId: id });
      if (!isExists) {
        return res.status(404).json({ message: "Item not found in favorite!" });
      }
      await isExists.deleteOne();
    }

    res.status(200).json({ message: `Successfully ${type} item in favorite!` });
  } catch (err) {
    return res.status(400).json({ message: `Failed to ${type} items!` });
  }
};

export default toggleFavoriteItems;
