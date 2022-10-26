import connection from "../database/postgres.js";

function checkFollowConnection(userId, personId) {
  return connection.query(
    `SELECT * FROM follows WHERE "followerId" = $1 AND "followedId" = $2;`,
    [userId, personId]
  );
}

function insertFollowConnection(userId, personId) {
  return connection.query(
    `INSERT INTO follows("followerId", "followedId") VALUES($1, $2);`,
    [userId, personId]
  );
}

function removeFollowConnection(userId, personId) {
  return connection.query(
    `DELETE FROM follows WHERE "followerId" = $1 AND "followedId" = $2;`,
    [userId, personId]
  );
}

export {
  checkFollowConnection,
  insertFollowConnection,
  removeFollowConnection,
};
