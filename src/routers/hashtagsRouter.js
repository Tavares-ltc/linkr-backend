import { Router } from "express";
import { getTrendingHashtags } from "../repositories/hashtagsRepository.js";
import { getPostsByHashtagName } from "../repositories/postsRepository";

const router = Router();

router.get('/hashtags', getTrendingHashtags);
router.get('/hashtags/:name', getPostsByHashtagName);

export default router;