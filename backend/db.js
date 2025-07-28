const mongoose = require("mongoose"); // importing library to work with mongoDB inside node.js
const mongoURI = "mongodb://localhost:27017/aki-notes"; // connection string that tells mongoose exactly how to find and connect to database

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectToMongo; // this makes the connectToMongo() function available to other files using require()