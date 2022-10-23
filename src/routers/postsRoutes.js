import { Router } from "express";
import checkToken from "../middlewares/checkTokeMiddleware.js";
import { readPosts, createPost } from "../controllers/postsController.js";

const route = Router();

route.get("/posts", checkToken, readPosts);
route.post("/posts", createPost);

export default route;
