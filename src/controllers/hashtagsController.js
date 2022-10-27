import urlMetadata from "url-metadata";
import { getHashtagByName, getTrendingHashtags, insertHashtag, updateHashtagCount } from "../repositories/hashtagsRepository.js";
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
    console.log(name);

    try {
        const posts = await getPostsByHashtagName(name);

        if (posts.rowCount === 0) {
            return notFoundRequestResponse(res);
        };
        console.log(posts.rows)

        const data = await Promise.all(
            posts.rows.map(async (post) => {
              const metadata = await urlMetadata(post.postLink);
              return await {
                ...post,
                metadataTitle: metadata.title,
                metadataDescription: metadata.description,
                metadataImage: metadata.image,
                metadataUrl: metadata.url,
              };
            })
          );

        return okResponse(res, data);
    } catch (error) {
        console.log('deu ruim');
        return serverErrorResponse(res);
    }
};

async function postNewHashtag(req, res) {
    const { hashtags } = res.locals;

    try {
        for (let i = 0; i < hashtags.length; i++) {
            await insertHashtag(hashtags[i]);
            const hashtag = await getHashtagByName(hashtags[i]);
            await updateHashtagCount(hashtag.rows[0].id);
        };
        return okResponse(res);
    } catch (error) {
        return serverErrorResponse(res, error);
    }
};

export {
    listTrendingHashtags,
    getHashtagPosts,
    postNewHashtag
}