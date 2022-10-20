import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userPageRoutes from "./routes/usersPageRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use(userPageRoutes);
app.use(postsRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
