import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import hashtagsRouter from './routers/hashtagsRouter.js';
import userRouter from './routers/userRouter.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(hashtagsRouter);

app.get('/status', (req, res) => res.status(200).send('ok'));

app.get('/status', (req, res) => {
	console.log('okay!');
	res.send('okay2!');
});

app.listen(process.env.PORT, () => {
	console.log(`Server is listening on port ` + process.env.PORT);
});
