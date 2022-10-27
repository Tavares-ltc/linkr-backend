import { Router } from 'express';
import {
	postComment,
	getComments,
	getCommentsCount,
	verifyFollower,
	getIdByToken,
} from '../controllers/commentsController.js';

const commentsRouter = Router();

commentsRouter.post('/comments', postComment);
commentsRouter.get('/comments/:postId', getComments);
commentsRouter.get('/commentscount/:postId', getCommentsCount);
commentsRouter.post('/verifyfollower', verifyFollower);
commentsRouter.get('/getid', getIdByToken);

export default commentsRouter;
