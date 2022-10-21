import {
  unprocessableRequestResponse,
  serverErrorResponse,
  notFoundRequestResponse,
} from "../controller/controllerHelper.js";
import selectUser from "../repositories/userRepository.js";

async function checkToken(req, res, next) {
  let token = req.headers.authorization;

  if (token?.split(" ")[0] !== "Bearer" || !token?.split(" ")[1]) {
    return unprocessableRequestResponse(res);
  }

  token = token.split(" ")[1];

  try {
    const tokenIsValid = await selectUser(token);

    if (tokenIsValid.rowCount === 0) {
      return notFoundRequestResponse(res);
    }

    next();
  } catch (error) {
    return serverErrorResponse(res, error);
  }
}

export default checkToken;
