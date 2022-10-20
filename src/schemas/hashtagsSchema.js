import joi from 'joi';

const hashtagSchema = joi.object({
    name: joi.string().trim().required()
});

export { hashtagSchema };