import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import userPageRoutes from "./routers/usersPageRouter.js"
import userRouter from './routers/userRouter.js';

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

app.use(userPageRoutes)

app.use(userRouter);


app.listen(process.env.PORT, () => {
	console.log(`Server is listening on port ` + process.env.PORT);
});
