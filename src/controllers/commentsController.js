import { stripHtml } from 'string-strip-html';
import {
	insertComment,
	commentsGet,
	commentsGetCount,
	followVerify,
	findIdByToken,
} from '../repositories/commentsRepository.js';

const postComment = async (req, res) => {
	let { message, userId, postId } = req.body;

	message = stripHtml(name).result.trim();

	try {
		await insertComment(message, postId, userId);

		res.sendStatus(201);
	} catch (error) {
		console.log(error);
	}
};

const getComments = async (req, res) => {
	const { postId } = req.params;

	try {
		const comments = await commentsGet(postId);
		res.status(200).send(comments.rows);
	} catch (error) {
		console.log(error);
	}
};

const getCommentsCount = async (req, res) => {
	const { postId } = req.params;

	try {
		const comments = await commentsGetCount(postId);
		res.status(200).send(comments.rows[0].count);
	} catch (error) {
		console.log(error);
	}
};

const verifyFollower = async (req, res) => {
	const { followerId, postAuthor } = req.body;

	try {
		const follow = await followVerify(followerId, postAuthor);
		res.status(200).send({ follow });
	} catch (error) {
		console.log(error);
	}
};

const getIdByToken = async (req, res) => {
	const token = req.headers.authorization?.replace('Bearer ', '');

	try {
		const commenterID = await findIdByToken(token);
		res.status(200).send(commenterID.rows[0]);
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
