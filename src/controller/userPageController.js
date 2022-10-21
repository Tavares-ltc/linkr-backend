import { getUserById } from "../repositories/userPageRepository.js";
import {
  unprocessableRequestResponse,
  notFoundRequestResponse,
  okResponse,
  serverErrorResponse,
} from "./controllerHelper.js";

async function getUserData(req, res) {
  const userId = req.params.id;
  console.log(userId);
  if (!userId) {
    return unprocessableRequestResponse(
      res,
      "A requisição necessita de um user id."
    );
  }

  try {
    const userData = await getUserById({ userId });
    if (!userData.rows[0]) {
      return notFoundRequestResponse(res, "Usuário não encontrado.");
    }
    return okResponse(res, userData.rows[0]);
  } catch (error) {
    serverErrorResponse(res, error, "Algo saiu errado.");
  }
}

export { getUserData };
