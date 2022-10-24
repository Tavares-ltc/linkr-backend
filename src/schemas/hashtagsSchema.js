import joi from 'joi';

const hashtagSchema = joi.object({
    hashtags: joi.array().items(
        joi.string().trim().required(),
        joi.string().trim()
    ).required()
});

export { hashtagSchema };