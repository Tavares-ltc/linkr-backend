import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import hashtagsRouter from './routers/hashtagsRouter.js';

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(hashtagsRouter);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
