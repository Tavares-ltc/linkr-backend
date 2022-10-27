import connection from '../database/postgres.js';

const postComment = async (req, res) => {
	let { message, userId, postId } = req.body;

	// name = stripHtml(name).result.trim();
	// email = stripHtml(email).result.trim();
	// password = stripHtml(password).result.trim();
	// image = stripHtml(image).result.trim();

	try {
		connection.query(
			`INSERT INTO comments (comment, "postId", "commenterId") 
          VALUES ($1, $2, $3)
          RETURNING id;`,
			[message, postId, userId]
		);

		res.status(201);
	} catch (error) {
		console.log(error);
	}
};

const getComments = async (req, res) => {
	const { postId } = req.params;

	try {
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
		res.send(comments.rows);
	} catch (error) {
		console.log(error);
	}
};

const getCommentsCount = async (req, res) => {
	const { postId } = req.params;

	try {
		const comments = await connection.query(
			'SELECT COUNT("postId") FROM comments WHERE "postId" = $1;',
			[postId]
		);
		res.send(comments.rows[0].count);
	} catch (error) {
		console.log(error);
	}
};

const verifyFollower = async (req, res) => {
	const { followerId, postAuthor } = req.body;

	try {
		const follow = await connection.query(
			'SELECT * FROM follows WHERE "followerId" = $1 AND "followedId" = $2;',
			[followerId, postAuthor]
		);

		res.status(200).send(follow);
	} catch (error) {
		console.log(error);
	}
};

const getIdByToken = async (req, res) => {
	const token = req.headers.authorization?.replace('Bearer ', '');

	try {
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
		res.status(201).send(commenterID.rows[0]);
	} catch (error) {
		console.log(error);
	}
};

export {
	postComment,
	getComments,
	getCommentsCount,
	verifyFollower,
	getIdByToken,
};
