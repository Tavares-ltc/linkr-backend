import { Router } from "express";
import { postNewHashtag } from "../controllers/hashtagsController.js";
import { hashtagsMiddleware } from "../middlewares/hashtagsMiddleware.js";
import { getTrendingHashtags } from "../repositories/hashtagsRepository.js";
import { getPostsByHashtagName } from "../repositories/postsRepository.js";

const router = Router();

router.get('/hashtags', getTrendingHashtags);
router.get('/hashtags/:name', getPostsByHashtagName);
router.post('/hashtags', hashtagsMiddleware, postNewHashtag);

export default router;