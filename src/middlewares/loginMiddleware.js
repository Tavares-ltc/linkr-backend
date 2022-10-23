import { signInSchema, signUpSchema } from '../schemas/userSchema.js';

const signUpMiddleware = (req, res, next) => {
	const { name, email, password, image } = req.body;
	const validation = signUpSchema.validate(
		{ name, email, password, image },
		{ abortEarly: false }
	);

	if (validation.error) {
		const errors = validation.error.details
			.map((value) => value.message)
			.join(',\n');
		console.log(errors);
		return res.status(422).send(errors);
	}

	res.locals.user = { name, email, password, image };
	next();
};

const signInMiddleware = (req, res, next) => {
	const { email, password } = req.body;
	const validation = signInSchema.validate(
		{ email, password },
		{ abortEarly: false }
	);

	if (validation.error) {
		const errors = validation.error.details
			.map((value) => value.message)
			.join(',');

		return res.status(422).send(errors);
	}

	res.locals.user = { email, password };
	next();
};

export { signInMiddleware, signUpMiddleware };
