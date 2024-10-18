import express from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { showAllPosts } from "../controllers/getAllPosts.js";


const allPosts = express.Router();

allPosts.get('/posts', showAllPosts)


export default allPosts;