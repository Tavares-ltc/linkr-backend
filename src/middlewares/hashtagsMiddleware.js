import { hashtagSchema } from "../schemas/hashtagsSchema.js";
import { validateSchema } from "./schemasValidation.js";

async function hashtagsMiddleware(req, res, next) {
    const { name } = req.body;
    validateSchema(res, hashtagSchema, req.body);

    res.locals.hashtagName = name;
    next();
};

export { hashtagsMiddleware };