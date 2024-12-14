// /pages/api/register.js
import bcrypt from "bcryptjs";
// import User from "../../../../models/user";
// import { connectToDatabase } from "../../../../lib/mongodb";
// import { decodeData } from "@/utils";
// import { generateOTP } from "../../../../lib/otp";
// import { sendEmail } from "../../../../lib/email";

import { decodeData, JWT_SECRET } from "@/lib/utils";
import { connectToDb } from "@/lib/utils";
import { User } from "@/lib/models";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: false, message: "Method not allowed" });
  }

  const requestBody = decodeData(req.body);
  const { userName, email, password } = requestBody;

  // Check for required fields
  if (!userName || !email || !password) {
    return res.status(400).json({
      status: false,
      message: "All fields are required",
    });
  }

  try {
    await connectToDb();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      userName,
      // lastName,
      email,
      password: hashedPassword,
      // userType: "admin",
    });

    await newUser.save();

    // Generate OTP
    // const otp = generateOTP(); // You can implement a function to generate a random OTP
    // await sendEmail(email, otp); // Send OTP to the user's email

    // Store the OTP in the user's document or a separate OTP collection
    newUser.otp = otp; // Save OTP for later verification

    newUser.otpExpireTime = new Date().toISOString();
    await newUser.save();

    res.status(201).json({
      status: true,
      message: "User registered successfully. Please verify your email.",
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Provide more detailed error messages
    if (error.name === "MongoError" && error.code === 11000) {
      return res.status(400).json({
        status: false,
        message: "User with this email already exists",
      });
    }

    // Generic server error message
    res
      .status(500)
      .json({ status: false, message: "Server error: " + error.message });
  }
}
