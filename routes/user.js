import express from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { deletePost, getUserPosts, udatePost, userController } from "../controllers/controllerPost.js";


const userRouter = express.Router();


userRouter.post("/post", authenticateUser, userController);

userRouter.get('/post', authenticateUser, getUserPosts)

userRouter.put('/post/:id', authenticateUser, udatePost)

userRouter.delete('/post/:id', authenticateUser, deletePost)




export default userRouter;
