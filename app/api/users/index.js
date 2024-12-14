// /pages/api/users/index.js
import { authenticate } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export default async function handler(req, res) {
  // Protect the route with the authenticate middleware
  authenticate(req, res, async () => {
    if (req.method !== "GET") {
      return res
        .status(405)
        .json({ status: false, message: "Method not allowed" });
    }

    try {
      await connectToDatabase();

      // Fetch the user list, excluding passwords
      const users = await User.find().select("-password"); // Exclude password field

      // Return the user list
      res.status(200).json({
        status: true,
        message: "User list retrieved successfully",
        users,
      });
    } catch (error) {
      console.error("Error fetching user list:", error);
      res.status(500).json({ status: false, message: "Server error" });
    }
  });
}
