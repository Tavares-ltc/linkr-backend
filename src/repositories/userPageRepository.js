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

async function searchUserByName(userId, name) {
  return connection.query(
    `SELECT users.id, users.name, users.image, 
    (SELECT true FROM follows WHERE "followedId" = users.id AND "followerId" = $1) 
    AS "isFollowing" 
    FROM users 
    JOIN follows ON "followedId" = users.id WHERE users.name ILIKE $2 
    GROUP BY users.id ORDER BY "isFollowing";
    `,
    [userId ,name + '%']
  );
}

export { getUserById, getPostsById, searchUserByName };
