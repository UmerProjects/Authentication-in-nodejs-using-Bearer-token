import User from "../models/post.js";

export async function userController (req, res) {
    const { title } = req.body;
  
    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }
  
    try {
      const newPost = new User({
        title,
        createdBy: req.user._id, 
      });
  
      await newPost.save();
  
      res.status(201).json({
        status: "success",
        message: "Post created successfully.",
        post: newPost,
      });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error from controller", error: err.message });
    }
  }