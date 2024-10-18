import User from "../models/User.js";
import Post from "../models/post.js";



export async function showAllPosts(req, res) {
  try {
    const posts = await Post.find({}).populate('    ', 'first_name');

    if (!posts.length) {
      return res.status(404).json({
        status: "failed",
        message: "No posts found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: `Internal Server Error: ${error.message}`,
    });
  }
}


  
  