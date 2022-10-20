import connection from "../database/db.js";

function selectPosts() {
  return connection.query("SELECT * FROM posts;");
}

function insertPost({ userId, description, link }) {
  console.log({ userId, description, link });

  return connection.query(
    `INSERT INTO posts ("userId", description, link) 
  VALUES ($1, $2, $3);`,
    [userId, description, link]
  );
}

export { selectPosts, insertPost };
