import { Response, Request } from "express";
import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";

const uploadProfileImage = async (file: Request["file"]): Promise<string> => {
  return new Promise((resolve, reject) => {
     if (!file) {
      reject(new Error("No file provided!"));
      return;
    }
    
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "ProfileImages",
        transformation: [
          { width: 300, height: 300, crop: "fill", quality: "auto" }
        ],
      },
      (error: any, result: any) => {
        if (result) resolve(result.secure_url);
        else reject(new Error("Failed to upload Image!"));
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

export default uploadProfileImage;