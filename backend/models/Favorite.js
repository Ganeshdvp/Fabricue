import mongoose from "mongoose";

const favoriteSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

// compound index
favoriteSchema.index({ userId: 1, productId: 1 }, { unique: true });


const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;