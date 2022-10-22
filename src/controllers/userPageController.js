import {
  getUserById,
  getPostsById,
  searchUserByName,
} from "../repositories/userPageRepository.js";
import {
  unprocessableRequestResponse,
  notFoundRequestResponse,
  okResponse,
  serverErrorResponse,
} from "./controllerHelper.js";

async function getUserData(req, res) {
  const userId = req.params.id;
  if (!userId) {
    return unprocessableRequestResponse(res, "The request needs a user id.");
  }

  try {
    const userData = await getUserById({ userId });
    if (!userData.rows[0]) {
      return notFoundRequestResponse(res, "User not found.");
    }

    return okResponse(res, userData.rows[0]);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

async function getUserPosts(req, res) {
  const userId = req.params.id;
  if (!userId) {
    return unprocessableRequestResponse(res, "The request needs a user id.");
  }

  try {
    const postsList = await getPostsById({ userId });

    return okResponse(res, postsList.rows);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

async function getUsers(req, res) {
  const { name } = req.params;
  if (!name) {
    return unprocessableRequestResponse(res, "The request needs a username.");
  }
  try {
    const users = await searchUserByName(name);
    if (users.rows.length === 0) {
      return notFoundRequestResponse(res, "No users found.");
    }
    okResponse(res, users.rows);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

export { getUserData, getUserPosts, getUsers };