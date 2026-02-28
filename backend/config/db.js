import mongoose from "mongoose";

const connectDB = async () => {
   return await mongoose.connect(process.env.MONGODB_STRING);  // connection string
};

export default connectDB;