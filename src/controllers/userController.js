import connection from '../postgres/postgres.js';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import {
	insertUser,
	findUser,
	insertUserSession,
} from '../repositories/userRepositories.js';

const signUpSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).max(12),
	image: Joi.string()
		.required()
		.uri()
		.regex(
			/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
		),
});

const signInSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).max(12),
});

const postSignUp = async (req, res) => {
	const { name, email, password, image } = req.body;
	const hash = bcrypt.hashSync(password, 10);
	const validation = signUpSchema.validate(
		{ name, email, password, image },
		{ abortEarly: false }
	);

	console.log(req.body);
	try {
		if (validation.error) {
			const errors = validation.error.details
				.map((value) => value.message)
				.join(',\n');
			console.log(errors);
			return res.status(422).send(errors);
		}

		const existe = await findUser(email);

		if (existe.rows.length !== 0) {
			return res.status(409).send('email já cadastrado');
		}

		await insertUser(name, email, hash, image);

		res.sendStatus(201);
	} catch (error) {
		console.log(error);
	}
};

const postSignIn = async (req, res) => {
	const { email, password } = req.body;
	const validation = signInSchema.validate(
		{ email, password },
		{ abortEarly: false }
	);

	try {
		if (validation.error) {
			const errors = validation.error.details
				.map((value) => value.message)
				.join(',');

			return res.status(422).send(errors);
		}
		const existe = await findUser(email);
		if (
			!existe ||
			bcrypt.compareSync(password, existe.rows[0].password) === false
		) {
			return res.sendStatus(401);
		}
		const token = uuid();
		await insertUserSession(existe, token);
		res.status(200).send({ token });
	} catch (error) {
		console.log(error);
	}
};

export { postSignUp, postSignIn };
