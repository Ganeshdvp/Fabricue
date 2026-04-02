import mongoose from "mongoose";

const connectDB = async (): Promise<typeof mongoose> => {
  const mongoURL = process.env.MONGODB_STRING;
  if (!mongoURL) {
    throw new Error("Mongo Url is not defined");
  }
   return await mongoose.connect(mongoURL);  // connection string
};

export default connectDB;