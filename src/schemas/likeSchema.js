import joi from "joi";

const likeSchema = joi.object({
    userId: joi.number().required(),
    postId: joi.number().required()
});

export { likeSchema };