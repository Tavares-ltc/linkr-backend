import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { stripHtml } from 'string-strip-html';
import {
	insertUser,
	findUser,
	insertUserSession,
} from '../repositories/userRepositories.js';

const postSignUp = async (req, res) => {
	let { name, email, password, image } = res.locals.user;

	name = stripHtml(name).result.trim();
	email = stripHtml(email).result.trim();
	password = stripHtml(password).result.trim();
	image = stripHtml(image).result.trim();

	const hash = bcrypt.hashSync(password, 10);

	try {
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
	let { email, password } = res.locals.user;

	try {
		const existe = await findUser(email);
		if (
			existe.rows.length === 0 ||
			bcrypt.compareSync(password, existe.rows[0].password) === false
		) {
			return res.status(401).send('Email ou senha inválidos');
		}
		const token = uuid();
		await insertUserSession(existe, token);
		res.status(200).send({ token });
	} catch (error) {
		console.log(error);
	}
};

export { postSignUp, postSignIn };
