import connection from "../database/db.js";

async function getUserById({ userId }) {
  const userData = await connection.query(
    `SELECT id, name, "createdAt", image FROM users WHERE id = $1;`,
    [userId]
  );
  return userData;
}

async function getPostsById({ userId }) {
  const postsList = await connection.query(
    `
    SELECT  posts.*, COUNT(likes."postId") AS likes 
    FROM posts JOIN likes ON likes."postId" = posts.id 
    WHERE posts."userId" = $1 
    GROUP BY posts.id, posts."userId" ;`,
    [userId]
  );
  return postsList;
}

export { getUserById, getPostsById };
