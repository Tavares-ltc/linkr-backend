import { Router } from 'express';
import {
	postComment,
	getComments,
	getCommentsCount,
} from '../controllers/commentsController.js';

const commentsRouter = Router();

commentsRouter.post('/comments', postComment);
commentsRouter.get('/comments/:postId', getComments);
commentsRouter.get('/commentscount/:postId', getCommentsCount);

export default commentsRouter;
