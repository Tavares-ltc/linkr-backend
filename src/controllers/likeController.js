import dotenv from "dotenv";
import { addLike, checkLike, findLike, removeLike } from "../repositories/likeRepository.js";

dotenv.config();

export async function postLike(req, res) {
    const { userId, postId } = req.body;

    try {
        if (checkLike(userId, postId) > 0) {
            res.status(409).send("usuario ja deu like");
            return;
        }
        await addLike(userId, postId);

        res.status(201).send("like adicionado com sucesso!");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getLike(req, res) {
    const { postId } = req.query;
    try {
        const { rows: users } = await findLike(postId);
        
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deleteLike(req, res) {
    const { userId, postId } = req.query;

    try {
        await removeLike(userId, postId);

        res.status(201).send("like removido com sucesso!");
    } catch (error) {
        res.status(500).send(error.message);
    }
}