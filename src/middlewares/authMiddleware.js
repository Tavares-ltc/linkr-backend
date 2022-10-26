import connection from "../database/postgres.js";
import { unauthorizedRequestResponse } from "../controllers/controllerHelper.js";

async function authMiddlewere(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return unauthorizedRequestResponse(res);
  }
  try {
    const session = await connection.query(
      "SELECT * FROM sessions WHERE token=$1;",
      [token]
    );

    if (!session.rows[0]) {
      return unauthorizedRequestResponse(res);
    }
    const user = await connection.query("SELECT * FROM users WHERE id=$1", [
      session.rows[0].userId,
    ]);

    res.locals.user = user.rows[0];
    next();
  } catch (error) {
    console.error(error);
  }
}

export { authMiddlewere };
