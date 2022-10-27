import connection from '../database/postgres.js';

async function insertComment(message, postId, userId) {
	await connection.query(
		`INSERT INTO comments (comment, "postId", "commenterId") 
      VALUES ($1, $2, $3)
      RETURNING id;`,
		[message, postId, userId]
	);
}

async function commentsGet(postId) {
	const comments = await connection.query(
		`
    SELECT 
        posts."userId" AS "authorId",
        posts.id AS "postId",
        "commenterId",
        users.name AS "commenterName",
        comment,
        t2.image AS "commenterImage"
    FROM posts
    JOIN comments 
      ON posts.id = comments."postId"
    JOIN users
      ON users.id = "commenterId"
    JOIN users AS t2 
      ON "commenterId" = t2.id
    WHERE "postId" = $1;`,
		[postId]
	);
	return comments;
}

async function commentsGetCount(postId) {
	const comments = await connection.query(
		'SELECT COUNT("postId") FROM comments WHERE "postId" = $1;',
		[postId]
	);
	return comments;
}

async function followVerify(followerId, postAuthor) {
	const follow = await connection.query(
		'SELECT * FROM follows WHERE "followerId" = $1 AND "followedId" = $2;',
		[followerId, postAuthor]
	);
	return follow;
}

async function findIdByToken(token) {
	const commenterID = await connection.query(
		`
    SELECT 
        "userId",
        token,
        image
    FROM sessions
    JOIN users 
      ON sessions."userId" = users.id
    WHERE token = $1;`,
		[token]
	);
	return commenterID;
}

export {
	insertComment,
	commentsGet,
	commentsGetCount,
	followVerify,
	findIdByToken,
};
