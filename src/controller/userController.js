import selectUser from "../repositories/userRepository.js";
import {
  serverErrorResponse,
  unprocessableRequestResponse,
  okResponse,
  notFoundRequestResponse,
} from "./controllerHelper.js";

async function readUser(req, res) {
  let token = req.headers.authorization;

  if (token?.split(" ")[0] !== "Bearer" || !token?.split(" ")[1]) {
    return unprocessableRequestResponse(res);
  }

  token = token.split(" ")[1];

  try {
    const result = await selectUser(token);

    if (result.rowCount === 0) {
      return notFoundRequestResponse(res);
    }

    okResponse(res, result.rows[0]);
  } catch (error) {
    serverErrorResponse(res, error);
  }
}

export default readUser;
