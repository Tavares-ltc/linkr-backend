import { Router } from 'express';
import { postSignUp, postSignIn } from '../controllers/userController.js';

const userRouter = Router();

userRouter.post('/signup', postSignUp);
userRouter.post('/signin', postSignIn);

export default userRouter;
