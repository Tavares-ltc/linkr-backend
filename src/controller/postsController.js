import urlMetadata from "url-metadata";
import { selectPosts, insertPost } from "../repositories/postsRepository.js";
import {
  serverErrorResponse,
  unprocessableRequestResponse,
  createdResponse,
} from "./controllerHelper.js";

async function readPosts(req, res) {
  try {
    const posts = await selectPosts();

    const data = await Promise.all(
      posts.rows.map(async (post) => {
        const metadata = await urlMetadata(post.postLink);
        return await {
          ...post,
          metadataTitle: metadata.title,
          metadataDescription: metadata.description,
          metadataImage: metadata.image,
          metadataUrl: metadata.url,
        };
      })
    );

    res.status(201).send(data);
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
    await insertPost({ userId, description, link });

    createdResponse(res);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

export { readPosts, createPost };
