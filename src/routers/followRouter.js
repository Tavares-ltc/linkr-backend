import { Router } from "express";
import { checkFollow, followPerson, unfollowPerson } from "../controllers/followController.js";
import { authMiddlewere } from "../middlewares/authMiddleware.js";


const router = Router()

router.get('/follow/:personId', authMiddlewere, checkFollow)
router.post('/follow', authMiddlewere, followPerson)
router.delete('/follow/:personId', authMiddlewere, unfollowPerson)

export default router