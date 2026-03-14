import mongoose from "mongoose";
import validator from "validator";

const addressSchema = mongoose.Schema({
  addressType: {
    type: String,
    require: true,
    enum: ["Home", "Office"],
  },
  landMark: {
    type: String,
    require: true,
    default: "",
  },
  city: {
    type: String,
    require: true,
    default: "",
  },
  state: {
    type: String,
    require: true,
    default: "",
  },
  pinCode: {
    type: Number,
    require: true,
    default: "",
  },
  country: {
    type: String,
    require: true,
    default: "",
  },
});

const profileSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    image: {
      type: String,
      require: true,
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
      require: true,
    },
  },
  { timestamps: true },
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
