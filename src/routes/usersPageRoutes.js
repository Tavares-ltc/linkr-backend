import express from "express";
import { getUserData, getUserPosts } from "../controller/userPageController.js";

const router = express.Router();

router.get("/user/data/:id", getUserData);
router.get("/user/posts/:id", getUserPosts);

export default router;
