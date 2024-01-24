const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_CLOUD);
    console.log("MongoDB connection connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
