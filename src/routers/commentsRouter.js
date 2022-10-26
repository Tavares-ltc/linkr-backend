import { Router } from 'express';
import { postComment, getComments } from '../controllers/commentsController.js';

const commentsRouter = Router();

commentsRouter.post('/comments', postComment);
commentsRouter.get('/comments/:postId', getComments);

export default commentsRouter;
