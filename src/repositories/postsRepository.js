import connection from "../database/db.js";

function selectPosts() {
  return connection.query(
    `SELECT posts.id, posts."userId", posts.description "postDescription", posts.link "postLink", users.name "userName", users.image "userImage" FROM posts JOIN users ON posts."userId" = users.id ORDER BY posts.id DESC LIMIT 20;`
  );
}

function insertPost({ userId, description, link }) {
  return connection.query(
    `INSERT INTO posts ("userId", description, link) 
  VALUES ($1, $2, $3);`,
    [userId, description, link]
  );
}

export { selectPosts, insertPost };
