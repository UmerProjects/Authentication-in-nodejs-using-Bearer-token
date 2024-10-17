import express from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { deletePost, displayPost, udatePost, userController } from "../controllers/controllerPost.js";


const userRouter = express.Router();


userRouter.post("/post", authenticateUser, userController);

userRouter.get('/post/:id', authenticateUser, displayPost)

userRouter.put('/post/:id', authenticateUser, udatePost)

userRouter.delete('/post/:id', authenticateUser, deletePost)



export default userRouter;
