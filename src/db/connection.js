import mongoose from "mongoose";

/**
 * Database သို့ ချိတ်ဆက်ပေးသော function
 * @param {string} url - MongoDB Connection String
 */
const connectDB = async (url) => {
  if (!url) {
    console.error(
      "❌ Error: MongoDB URL is required to connect to the database.",
    );
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(url);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1); // ချိတ်မရရင် Server ကို ရပ်ပစ်မယ်
  }
};

export default connectDB;
