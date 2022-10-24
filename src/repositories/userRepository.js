import connection from "../database/postgres.js";

function selectUser(token) {
  return connection.query(
    `SELECT users.id, users.name, users.image FROM sessions JOIN users ON sessions."userId" = users.id WHERE sessions.token = $1;`,
    [token]
  );
}

async function insertUser(name, email, hash, image) {
  await connection.query(
    "INSERT INTO users (name, email, password, image) VALUES ($1, $2, $3, $4);",
    [name, email, hash, image]
  );
}

async function findUser(email) {
  const existe = await connection.query(
    "SELECT users.name, users.id, users.password FROM users WHERE email = $1;",
    [email]
  );
  return existe;
}

async function insertUserSession(existe, token) {
  await connection.query(
    'INSERT INTO sessions ("userId", token, valid) VALUES ($1, $2, $3);',
    [existe.rows[0].id, token, true]
  );
}

export { insertUser, findUser, insertUserSession, selectUser };
