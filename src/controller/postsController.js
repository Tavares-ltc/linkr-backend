import { selectPosts, insertPost } from "../repositories/postsRepository.js";
import {
  serverErrorResponse,
  unprocessableRequestResponse,
  createdResponse,
} from "./controllerHelper.js";

async function readPosts(req, res) {
  try {
    const posts = await selectPosts();

    res.status(201).send(posts.rows);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

async function createPost(req, res) {
  const { userId, description, link } = req.body;

  const token = req.headers.authorization;

  if (token?.split(" ")[0] !== "Bearer" || !token?.split(" ")[1]) {
    return unprocessableRequestResponse(res);
  }

  try {
    const isCreated = await insertPost({ userId, description, link });

    createdResponse(res);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

export { readPosts, createPost };
