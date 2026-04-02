import mongoose, { Model } from "mongoose";

interface FavoriteSchema {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
}

const favoriteSchema = new mongoose.Schema<FavoriteSchema>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

// compound index
favoriteSchema.index({ userId: 1, productId: 1 }, { unique: true });


const Favorite: Model<FavoriteSchema> = mongoose.model<FavoriteSchema>("Favorite", favoriteSchema);

export default Favorite;