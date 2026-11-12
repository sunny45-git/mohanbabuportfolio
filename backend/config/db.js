import mongoose from 'mongoose';

let isDbConnected = false;

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('[DB] MONGODB_URI not configured. Running API in stateless demo mode.');
    isDbConnected = false;
    return false;
  }

  try {
    await mongoose.connect(uri);
    isDbConnected = true;
    console.log('[DB] Connected to MongoDB.');
    return true;
  } catch (err) {
    console.warn('[DB] MongoDB connection unavailable; continuing in demo mode:', err.message);
    isDbConnected = false;
    return false;
  }
}

export function getDbStatus() {
  return isDbConnected && mongoose.connection.readyState === 1;
}

