import connection from "../database/postgres.js";

async function getPostsByHashtagName(name) {
  return await connection.query(
    `SELECT posts.*
        FROM posts
        JOIN "postsHashtags"
        ON posts.id = "postsHashtags"."postId"
        JOIN hashtags
        ON hashtags.id = "postsHashtags"."hashtagId"
        WHERE hashtags.name = $1;`,
    [name]
  );
}

function selectPosts() {
  return connection.query(
    `SELECT posts.id, posts."userId", posts.description "postDescription", posts.link "postLink", users.name "userName", users.image "userImage" FROM posts JOIN users ON posts."userId" = users.id ORDER BY posts.id DESC LIMIT 20;`
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
};
