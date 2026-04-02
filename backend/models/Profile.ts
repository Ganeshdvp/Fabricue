import mongoose, { Document, Model } from "mongoose";
import validator from "validator";

interface AddressSchemaInterface extends Document {
  addressType: "Home" | "Office";
  landMark: string;
  city: string;
  state: string;
  pinCode: number;
  country: string;
}

interface ProfileSchemaInterface extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  image: string;
  address: AddressSchemaInterface[];
}

const addressSchema = new mongoose.Schema<AddressSchemaInterface>({
  addressType: {
    type: String,
    required: true,
    enum: ["Home", "Office"],
  },
  landMark: {
    type: String,
    required: true,
    default: "",
  },
  city: {
    type: String,
    required: true,
    default: "",
  },
  state: {
    type: String,
    required: true,
    default: "",
  },
  pinCode: {
    type: Number,
    required: true,
    default: 0,
  },
  country: {
    type: String,
    required: true,
    default: "",
  },
});

const profileSchema = new mongoose.Schema<ProfileSchemaInterface>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    image: {
      type: String,
      required: true,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png",
      validator: {
        validator: (value: string) => {
          if (!validator.isURL(value)) {
            throw new Error(`${value} is not valid!`);
          }
        },
      },
    },
    address: {
      type: [addressSchema],
      required: true,
    },
  },
  { timestamps: true },
);

profileSchema.index({ userId: 1 }, { unique: true }); // index

const Profile: Model<ProfileSchemaInterface> = mongoose.model<ProfileSchemaInterface>("Profile", profileSchema);

export default Profile;
