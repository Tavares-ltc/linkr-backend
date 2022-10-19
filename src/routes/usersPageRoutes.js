import express from "express";
import { getUserData } from "../controller/userPageController.js";

const router = express.Router();

router.get("/user/data/:id", getUserData)
router.get("/user/posts/:id")

export default router