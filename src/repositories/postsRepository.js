import connection from "../database/postgres.js";

async function getPostsByHashtagName(name) {
    return await connection.query(
        `SELECT posts.*
        FROM posts
        JOIN postsHashtags
        ON posts.id = postsHashtags."postId"
        JOIN hashtags
        ON hashtags.id = postsHashtags."hashtagId"
        WHERE hashtags.name = $1;`,
        [name]
    );
};

export {
    getPostsByHashtagName
}