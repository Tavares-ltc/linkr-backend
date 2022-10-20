import { Router } from "express";
import { readPosts, createPost } from "../controller/postsController.js";

const route = Router();

route.get("/posts", readPosts);
route.post("/posts", createPost);

export default route;
