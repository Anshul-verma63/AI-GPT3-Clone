import mongoose from "mongoose";
import "colors";

const connectDB = async (req, res) => {
  try {
    const res = await mongoose.connect(process.env.DB_URI);
    console.log(`Database connected successfully ${res.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
