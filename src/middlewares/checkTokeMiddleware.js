import {
  serverErrorResponse,
  unauthorizedRequestResponse,
} from "../controllers/controllerHelper.js";
import { selectUser } from "../repositories/userRepository.js";

async function checkToken(req, res, next) {
  let token = req.headers.authorization;

  if (token?.split(" ")[0] !== "Bearer" || !token?.split(" ")[1]) {
    return unauthorizedRequestResponse(res);
  }

  token = token.split(" ")[1];

  try {
    const tokenIsValid = await selectUser(token);

    if (tokenIsValid.rowCount === 0) {
      return unauthorizedRequestResponse(res);
    }

    res.locals.userId = tokenIsValid.rows[0].id;

    next();
  } catch (error) {
    return serverErrorResponse(res, error);
  }
}

export default checkToken;
