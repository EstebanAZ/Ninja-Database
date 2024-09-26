// src/config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error(`Error: ${err.message}`);
    // Retry connection if failed
    if (err.name === 'MongoNetworkError') {
      console.error('Network issue detected. Retrying connection...');
      setTimeout(connectDB, 5000); // Retry after 5 seconds
    } else {
      process.exit(1); // Exit the process if the error is not network-related
    }
  }
};

module.exports = connectDB;
