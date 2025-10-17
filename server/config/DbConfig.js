import mongoose from "mongoose"
import dotenv from 'dotenv';

dotenv.config();

const DB_URI = process.env.DB_URI;

// Centralized Mongoose configuration
mongoose.set('strictQuery', true);

const dbOptions = {
  // Use the modern URL string parser
  useNewUrlParser: true,
  // Use the new Server Discover and Monitoring engine
  useUnifiedTopology: true,
  // Reasonable timeouts to avoid long buffering
  serverSelectionTimeoutMS: 10000, // 10s
  socketTimeoutMS: 45000, // 45s
  // Pool tuning (optional, safe defaults)
  maxPoolSize: 10,
};

// Attach basic connection event listeners once
if (mongoose.connection.listeners('connected').length === 0) {
  mongoose.connection.on('connected', () => {
    const { host, name } = mongoose.connection;
    console.log('Connected to database ✨:', host, 'database:', name);
  });
}

if (mongoose.connection.listeners('error').length === 0) {
  mongoose.connection.on('error', (err) => {
    console.error('Database connection error ⚠️', err?.message || err);
  });
}

if (mongoose.connection.listeners('disconnected').length === 0) {
  mongoose.connection.on('disconnected', () => {
    console.warn('Database disconnected. Retrying on next request...');
  });
}

// Export an async connector that resolves when the DB is ready
const connectDB = async () => {
  if (!DB_URI || typeof DB_URI !== 'string' || DB_URI.trim().length === 0) {
    throw new Error('DB_URI is not set. Please configure your environment.');
  }

  // Avoid duplicate connects across hot-reloads
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  return mongoose.connect(DB_URI, dbOptions);
};

export default connectDB;
