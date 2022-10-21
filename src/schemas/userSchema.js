import Joi from 'joi';

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

export { signInSchema, signUpSchema };
