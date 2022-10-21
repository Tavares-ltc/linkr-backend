import { unprocessableRequestResponse } from "../controllers/controllerHelper.js";

function validateSchema (res, schema, values) {
    const validation = schema.validate(values);

    if (validation.error) {
        const messages = validation.error.details.map(detail => detail.message);
        return unprocessableRequestResponse(res, messages);
    };
};

export { validateSchema };