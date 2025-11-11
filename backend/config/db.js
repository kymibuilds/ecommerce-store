import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("db connected successfully");
  });
  await mongoose.connect(`${process.env.MONGO_URI}/forever`);
};

export default connectDB;
