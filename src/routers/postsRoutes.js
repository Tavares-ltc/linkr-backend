import { Router } from "express";
import checkToken from "../middlewares/checkTokeMiddleware.js";
import {
  readPosts,
  createPost,
  deletePost,
  updatePost,
  postsCount,
} from "../controllers/postsController.js";
import { authMiddlewere } from "../middlewares/authMiddleware.js";

const route = Router();

route.get("/posts", checkToken, readPosts);
route.post("/posts", createPost);
route.delete("/delete/:postId", authMiddlewere, deletePost);
route.put("/updatePost/:postId", authMiddlewere, updatePost);
route.get("/posts/count", checkToken, postsCount);

export default route;
