import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";

const uploadProfileImage = async (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "ProfileImages",
        transformation: [
          { width: 300, height: 300, crop: "fill", quality: "auto" }
        ],
      },
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(new Error("Failed to upload Image!"));
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

export default uploadProfileImage;