import connection from "../database/postgres.js";

async function getPostsByHashtagName(name) {
  return await connection.query(
    `SELECT posts.id, posts."userId", posts.description AS "postDescription",
        posts.link AS "postLink", users.name AS "userName", users.image AS "userImage"
      FROM posts
      JOIN users
      ON users.id = posts."userId"
      JOIN "postsHashtags"
      ON posts.id = "postsHashtags"."postId"
      JOIN hashtags
      ON hashtags.id = "postsHashtags"."hashtagId"
      WHERE hashtags.name = $1
      ORDER BY posts."createdAt" DESC
      LIMIT 20;`,
    [name]
  );
};

function selectPosts(id) {
  return connection.query(
    `SELECT posts.id, posts."userId", posts.description "postDescription", posts.link "postLink", users.name "userName", users.image "userImage" FROM follows JOIN posts ON follows."followedId" = posts."userId" JOIN users ON follows."followedId" = users.id WHERE follows."followerId" = $1 ORDER BY posts.id DESC;`,
    [id]
  );
}

function selectPostsCount(id) {
  return connection.query(
    `SELECT COUNT(posts.id) FROM follows JOIN posts ON follows."followedId" = posts."userId" JOIN users ON follows."followedId" = users.id WHERE follows."followerId" = $1;`,
    [id]
  );
}

function selectPeopleIFollow(id) {
  return connection.query(
    `SELECT follows."followedId" FROM follows WHERE follows."followerId" = $1;`,
    [id]
  );
}

function insertPost({ userId, description, link }) {
  return connection.query(
    `INSERT INTO posts ("userId", description, link) 
  VALUES ($1, $2, $3)
  RETURNING id;`,
    [userId, description, link]
  );
}

async function deleteThisPost({ postId }) {
  try {
    const post = await connection.query("SELECT * FROM posts WHERE id=$1;", [
      postId,
    ]);
    await connection.query("DELETE FROM posts WHERE id=$1;", [postId]);
    return post;
  } catch (error) {
    console.error(error);
  }
}
async function updateThisPost({ postId, description }) {
  await connection.query("UPDATE posts SET description=$1 WHERE id=$2;", [
    description,
    postId,
  ]);
  return connection.query("SELECT * FROM posts WHERE id=$1;", [postId]);
}

export {
  selectPosts,
  insertPost,
  deleteThisPost,
  updateThisPost,
  getPostsByHashtagName,
  selectPeopleIFollow,
  selectPostsCount,
};
