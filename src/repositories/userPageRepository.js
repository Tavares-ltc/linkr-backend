import connection from "../database/postgres.js";

async function getUserById({ userId }) {
  const userData = await connection.query(
    `SELECT id, name, "createdAt", image FROM users WHERE id = $1;`,
    [userId]
  );
  return userData;
}

async function getPostsById(userId) {
  const postsList = await connection.query(-
    `
    SELECT  posts.*, COUNT(likes."postId") AS likes 
    FROM posts LEFT JOIN likes ON likes."postId" = posts.id 
    WHERE posts."userId" = $1 
    GROUP BY posts.id, posts."userId" ;`,
    [userId]
  );
  return postsList;
}

async function searchUserByName(name) {
  return connection.query(
    `SELECT id, name, image FROM users WHERE users.name LIKE $1;`,
    [name + '%']
  );
}

export { getUserById, getPostsById, searchUserByName };
