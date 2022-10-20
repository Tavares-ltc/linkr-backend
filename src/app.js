import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
