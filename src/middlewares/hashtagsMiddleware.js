import { hashtagSchema } from "../schemas/hashtagsSchema.js";
import { validateSchema } from "./schemasValidation.js";

async function hashtagsMiddleware(req, res, next) {
    const { hashtags } = req.body;
    validateSchema(res, hashtagSchema, req.body);

    res.locals.hashtags = hashtags;
    next();
};

export { hashtagsMiddleware };