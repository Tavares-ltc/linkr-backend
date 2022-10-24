import express from "express";
import { authMiddlewere } from "../middlewares/authMiddleware.js";
import {
  getUserData,
  getUserPosts,
  getUsers,
} from "../controllers/userPageController.js";

const router = express.Router();

router.get("/user/data/:id",authMiddlewere, getUserData);
router.get("/user/posts/:id",authMiddlewere, getUserPosts);
router.get("/user/search/:name",authMiddlewere, getUsers);

export default router;
