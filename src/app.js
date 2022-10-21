import express from 'express';
import cors from 'cors';
import userRouter from './routers/userRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRouter);

app.get('/status', (req, res) => {
	console.log('okay!');
	res.send('okay2!');
});

app.listen(process.env.PORT, () => {
	console.log(`Server is listening on port ` + process.env.PORT);
});
