const mongoose = require('mongoose');
// this connect db wil connect our node applcation to mongodb database using mongoose library. it will use the connection string from .env file and connect to the database. if there is any error it will log the error and exit the process. if the connection is successful it will log the success message.
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in .env');
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
