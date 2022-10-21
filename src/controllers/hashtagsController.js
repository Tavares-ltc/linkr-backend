import { getTrendingHashtags, insertHashtag } from "../repositories/hashtagsRepository.js";
import { getPostsByHashtagName } from "../repositories/postsRepository.js";
import { notFoundRequestResponse, okResponse, serverErrorResponse } from "./controllerHelper.js";

async function listTrendingHashtags(req, res) {
    try {
        const hashtags = await getTrendingHashtags();
        if (hashtags.rowCount === 0) {
            return notFoundRequestResponse(res);
        };

        return okResponse(res, hashtags.rows);
    } catch (error) {
        return serverErrorResponse(res, error);
    }
};

async function getHashtagPosts(req, res) {
    const { name } = req.params;

    try {
        const posts = await getPostsByHashtagName(name);

        if (posts.rowCount === 0) {
            return notFoundRequestResponse(res);
        };

        return okResponse(res, posts.rows);
    } catch (error) {
        return serverErrorResponse(res);
    }
};

async function postNewHashtag(req, res) {
    const { name } = res.locals;

    try {
        await insertHashtag(name)
        // return okResponse(res);
        return res.status(200).send('ok')
    } catch (error) {
        return serverErrorResponse(res);
    }
};

export {
    listTrendingHashtags,
    getHashtagPosts,
    postNewHashtag
}