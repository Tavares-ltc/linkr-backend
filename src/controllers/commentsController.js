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
			'SELECT * FROM comments WHERE "postId" = $1;',
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

export { postComment, getComments, getCommentsCount };
