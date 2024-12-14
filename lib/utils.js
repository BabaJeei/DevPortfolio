import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import mongoose from "mongoose";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const JWT_SECRET = "xzjkgvh"; // Use a strong secret key
export const encodeData = (data) => {
  return btoa(JSON.stringify(data)); // Base64 encoding
};
export const decodeData = (encodedData) => {
  return JSON.parse(atob(encodedData));
};
const connection = {};

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
