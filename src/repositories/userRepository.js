import connection from "../database/db.js";

function selectUser(token) {
  return connection.query(
    `SELECT users.id, users.name, users.image FROM sessions JOIN users ON sessions."userId" = users.id WHERE sessions.token = $1;`,
    [token]
  );
}

export default selectUser;
