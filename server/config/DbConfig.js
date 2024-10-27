import mongoose from "mongoose"
import dotenv from 'dotenv';

dotenv.config(); // Ensure this line is present


const DB_URI = process.env.DB_URI;

// Mongoose connection options
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };
console.log(process.env.DB_URI)
// connect db
const ConnectDB = () => {
  mongoose
    .connect(DB_URI, dbOptions).then((connect) => {
      console.log('Connected to database ✨: ', connect.connection.host,'database :',connect.connection.name);
    })
    .catch((err) => {
      console.log('Database connection error ⚠️', err.message);
    });
};

export default ConnectDB;
