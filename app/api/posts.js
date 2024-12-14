import { decodeData } from "@/utils";
import { connectToDatabase } from "../../../lib/mongodb";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getPosts(req, res);
    }

    case "POST": {
      return addPost(req, res);
    }

    case "PUT": {
      return updatePost(req, res);
    }

    case "DELETE": {
      return deletePost(req, res);
    }
  }
}

// Getting all posts.
async function getPosts1(req, res) {
  try {
    let { db } = await connectToDatabase();
    let posts = await db
      .collection("posts")
      .find({})
      .sort({ published: -1 })
      .toArray();
    return res.json({
      message: JSON.parse(JSON.stringify(posts)),
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function getPosts(req, res) {
  try {
    const { db } = await connectToDatabase();
    // console.log("db", db);
    const postsCursor = db.collection("posts").find({}).sort({ published: -1 });
    const posts = await postsCursor.toArray();
    return res.json({ message: posts, success: true });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
}

// Adding a new post
async function addPost(req, res) {
  try {
    let { db } = await connectToDatabase();
    // console.log("db", db);
    await db.collection("posts").insertOne(decodeData(req.body));
    return res.json({
      message: "Post added successfully",
      success: true,
    });
  } catch (error) {
    console.log(" error ---- ", error);
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// Updating a post
async function updatePost(req, res) {
  try {
    let { db } = await connectToDatabase();
    // console.log(" req.body --- ", req);

    await db.collection("posts").updateOne(
      {
        _id: new ObjectId(req.query._id),
      },
      { $set: { published: true } }
    );

    return res.json({
      message: "Post updated successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// deleting a post
async function deletePost(req, res) {
  try {
    let { db } = await connectToDatabase();

    await db.collection("posts").deleteOne({
      _id: new ObjectId(req.query._id),
    });

    return res.json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
