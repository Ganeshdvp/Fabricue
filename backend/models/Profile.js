import mongoose from "mongoose";
import validator from "validator";

const addressSchema = mongoose.Schema({
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
    default: "",
  },
  country: {
    type: String,
    required: true,
    default: "",
  },
});

const profileSchema = mongoose.Schema(
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
        validator: (value) => {
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

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
