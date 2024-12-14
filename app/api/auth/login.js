// /pages/api/auth/login.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import User from "../../../../models/user";
// import { connectToDatabase } from "../../../../lib/mongodb";
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
  const { email, password } = requestBody;

  if (!email || !password) {
    return res
      .status(400)
      .json({ status: false, message: "All fields are required" });
  }

  try {
    await connectToDb();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentials" });
    }
    if (!user.otpVerified) {
      return res.status(402).json({
        status: false,
        message: "User not authorised to enter please complete your signup",
      });
    }
    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid credentials" });
    }
    // console.log(" ----- user ---- ", user);

    // Create a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, userType: user.userType },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Return the token and user information
    res.status(200).json({
      status: true,
      message: "Login successful",
      user: {
        token: token,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
}
