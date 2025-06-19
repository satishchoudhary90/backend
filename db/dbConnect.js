import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI
    );
    if (!conn) {
      throw Error("Db not connected");
    }
    console.log(`${conn.connection.host} is connected to database`);
  } catch (error) {
    console.log("Error in dbConnect Method");
    process.exit(1);
  }
};
