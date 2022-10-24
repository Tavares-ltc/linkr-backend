import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import hashtagsRouter from './routers/hashtagsRouter.js';
import userRouter from './routers/userRouter.js';
import userPageRoutes from "./routers/usersPageRouter.js";
import userInfoRoute from "./routers/userInfoRoute.js";
import postsRoutes from "./routers/postsRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(userPageRoutes);
app.use(userRouter);
app.use(hashtagsRouter);
app.use(userInfoRoute);
app.use(postsRoutes);

app.get('/status', (req, res) => res.status(200).send('ok'));

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ` + process.env.PORT);
});
