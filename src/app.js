import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userPageRoutes from "./routes/usersPageRoutes.js"
const app = express();
dotenv.config();
const port = process.env.SERVER_URL;

app.use(cors());
app.use(express.json());

app.use(userPageRoutes)



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
