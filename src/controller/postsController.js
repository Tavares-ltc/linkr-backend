import urlMetadata from "url-metadata";
import { selectPosts, insertPost } from "../repositories/postsRepository.js";
import selectUser from "../repositories/userRepository.js";
import {
  serverErrorResponse,
  unprocessableRequestResponse,
  createdResponse,
  okResponse,
  unauthorizedRequestResponse,
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

    okResponse(res, data);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

async function createPost(req, res) {
  const { description, link } = req.body;

  let token = req.headers.authorization;

  if (token?.split(" ")[0] !== "Bearer" || !token?.split(" ")[1]) {
    return unprocessableRequestResponse(res);
  }

  token = token.split(" ")[1];

  try {
    const userExists = await selectUser(token);

    if (userExists.rowCount === 0) {
      return unauthorizedRequestResponse(res);
    }

    await insertPost({ userId: userExists.rows[0].id, description, link });

    createdResponse(res);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

export { readPosts, createPost };