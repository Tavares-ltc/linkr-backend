import connection from "../database/postgres.js";

export async function addLike(user, post) {
    return connection.query(`
    INSERT INTO likes
    ("likerId", "postId")
    VALUES
    ($1, $2)
    `, [user, post]);
}

export async function removeLike(user, post) {
    return connection.query(`
    DELETE FROM likes
    WHERE "likerId" = $1
    AND "postId" = $2
    `, [user, post])
}

export async function findLike(post) {
    return connection.query(`
    SELECT users.name, likes."postId", likes."likerId"
    FROM likes
    JOIN users ON likes."likerId" = users.id
    WHERE "postId" = $1
    `, [post])
}

export async function checkLike(user, post) {
    return connection.query(`
    SELECT * FROM likes
    WHERE "likerId" = $1
    AND "postId" = $2
    `, [user, post])
}