import Post from "../models/post.js";
import mongoose from "mongoose";

export async function userController(req, res) {
  const { title, message } = req.body;

  console.log(title);

  if (!title || !message) {
    return res
      .status(400)
      .json({ message: "Both title and message are required." });
  }

  try {
    const newPost = new Post({
      title,
      message,
      createdBy: req.user._id,
    });

    try {
      await newPost.save();
    } catch (err) {
      console.log(err);
    }

    res.status(201).json({
      status: "success",
      message: "Post created successfully.",
      post: newPost,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error from controller",
      error: err.message,
    });
  }
}

export async function displayPost(req, res) {
  try {
    const { id } = req.params;

    console.log("ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid ID format",
      });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        status: "failed",
        message: "Post not found",
      });
    }

    const { title, message } = post;

    res.status(200).json({
      status: "success",
      message: "Your post is successfully displayed",
      data: {
        title,
        message,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      errro: err.message,
    });
  }
}

export async function udatePost(req, res) {
  try {
    let { id } = req.params;

    const updatingPost = await Post.findByIdAndUpdate(id, req.body);

    if (!updatingPost) {
      return res.status(404).json({
        message: `cannot find any post using ${updatedPost}`,
      });
    }
    const updatedPost = await Post.findById(id);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({
      title: "failed",
      message: `There is an error: ${error}`,
    });
  }
}

export async function deletePost(req, res) {
  
  try {
    const {id} = req.params;
    const deletingPost = await Post.findByIdAndDelete(id);
    if(!deletingPost){
      return res.status(404).json({
        message: `The post is not find to delete: ${deletingPost}`
      })
    }
    res.status(200).json(deletingPost)

  } catch (error) {
    res.status(404).json({
      message: `you got an error when deleting: ${error}`
    })
  }

  
}
