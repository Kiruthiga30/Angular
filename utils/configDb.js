require("dotenv").config();
const mongoose = require("mongoose");

const mongoString = process.env.DATABASE_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(mongoString);
    console.log("Database connected Successfully...");
  } catch {
    console.log("Database Not Connected...");
  }
};

module.exports = connectDb;
