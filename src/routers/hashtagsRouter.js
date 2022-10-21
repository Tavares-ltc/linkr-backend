import { Router } from "express";
import { getHashtagPosts, listTrendingHashtags, postNewHashtag } from "../controllers/hashtagsController.js";
import { hashtagsMiddleware } from "../middlewares/hashtagsMiddleware.js";

const router = Router();

router.get('/hashtags', listTrendingHashtags);
router.get('/hashtags/:name', getHashtagPosts);
router.post('/hashtags', hashtagsMiddleware, postNewHashtag);

export default router;