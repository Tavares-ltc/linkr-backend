import { Router } from "express";
import { postLike, getLike, deleteLike } from "../controllers/likeController.js";
import { likeSchema } from "../schemas/likeSchema.js";
import checkToken from "../middlewares/checkTokeMiddleware.js"
import { validateSchema } from "../middlewares/schemaValidator.js";

const likeRouter = Router();

likeRouter.post("/like",validateSchema(likeSchema), postLike);
likeRouter.delete("/like", deleteLike);
likeRouter.get("/like", getLike);

export default likeRouter;