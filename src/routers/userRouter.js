import { Router } from 'express';
import { postSignUp, postSignIn } from '../controllers/userController.js';
import {
	signInMiddleware,
	signUpMiddleware,
} from '../middlewares/loginMiddleware.js';

const userRouter = Router();

userRouter.post('/signup', signUpMiddleware, postSignUp);
userRouter.post('/signin', signInMiddleware, postSignIn);

export default userRouter;
