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

// export async function displayPost(req, res) {
//   try {
//     const { id } = req.params;

//     console.log("ID:", id);

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         status: "failed",
//         message: "Invalid ID format",
//       });
//     }

//     const post = await Post.findById(id);

//     if (!post) {
//       return res.status(404).json({
//         status: "failed",
//         message: "Post not found",
//       });
//     }

//     const { title, message } = post;

//     res.status(200).json({
//       status: "success",
//       message: "Your post is successfully displayed",
//       data: {
//         title,
//         message,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       status: "error",
//       message: "Internal Server Error",
//       errro: err.message,
//     });
//   }
// }

export async function getUserPosts(req, res){
  try{
    const userId = req.user._id;

    const userPosts = await Post.find({createdBy: userId});

    res.status(200).json({
      status: "success",
      posts: userPosts,
    })

  } catch (err){
    res.status(500).json({
      message: "Internal Server error", error: err.message
    })
  }
}

export async function udatePost(req, res) {
  try {
    let { id } = req.params;
    const userId = req.user._id;

    console.log(req);


    const post = await Post.findById(id);

    if(!post){
      return res.status(404).json({
        message: `cannot find any post with the id: ${post}`
      })
    }

    if(post.createdBy.toString() !== userId.toString()){
      return res.status(404).json({
        message: "You are not authorized to update this post" 
      })
    }

    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedPost) {
      return res.status(404).json({
        message: `cannot find any post using ${updatedPost}`,
      });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({
      title: "failed in put",
      message: `There is an error: ${error}`,
    });
  }
}

export async function deletePost(req, res) {
  
  try {
    const {id} = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);

    if(!post){
      return res.status(404).json({
        message: "We canot see any post with this id"
      })
    }

    if(post.createdBy.toString() !== userId.toString()){
      return res.status(403).json({
        message: "You are unauthorized to delete this post because you not login"
      })
    }

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
