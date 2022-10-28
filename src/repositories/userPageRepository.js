import connection from "../database/postgres.js";

async function getUserById({ userId }) {
  const userData = await connection.query(
    `SELECT id, name, "createdAt", image FROM users WHERE id = $1;`,
    [userId]
  );
  return userData;
}

async function getPostsById(userId) {
  const postsList = await connection.query(
    `
    SELECT posts.id, posts."userId", posts.description AS "postDescription",
	    posts.link AS "postLink", users.name AS "userName", users.image AS "userImage"
    FROM posts
    JOIN users
    ON users.id = posts."userId"
    WHERE users.id = $1
    ORDER BY posts."createdAt" DESC
    LIMIT 20;`,
    [userId]
  );
  return postsList;
}

async function searchUserByName(name) {
  return connection.query(
    `SELECT id, name, image FROM users WHERE users.name ILIKE $1;`,
    [name + '%']
  );
}

export { getUserById, getPostsById, searchUserByName };
