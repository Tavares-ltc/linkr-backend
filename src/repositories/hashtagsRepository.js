import { connection } from "../database/db.js";

async function getHashtagByName(name) {
        return await connection.query('SELECT * FROM hashtags WHERE name = $1;', [name]);
};

async function getTrendingHashtags() {
    return await connection.query(
        `SELECT hashtags.name, COUNT(postsHashtags.id) AS occurrences
        FROM hashtags
        JOIN postsHashtags 
        ON hashtags.id = postsHashtags."hashtagId"
        GROUP BY hashtags.name
        ORDER BY occurrences DESC
        LIMIT 10;`
    );
};

async function getPostsByHashtagName(name) {
    return await connection.query(
        `SELECT posts.*
        FROM posts
        JOIN postshashtags
        ON posts.id = postshashtags."postId"
        JOIN hashtags
        ON hashtags.id = postshashtags."hashtagId"
        WHERE hashtags.name = $1;`,
        [name]
    );
}

async function insertHashtag(res, name) {
        return await connection.query(
            `INSERT INTO hashtags (name)
            VALUES ($1)
            ON CONFLICT (name) DO NOTHING;`,
            [name]
        );
};

async function updateHashtagCount(hashtag, post) {
        return await connection.query(
            `INSERT INTO "postsHashtags" ("postId", "hashtagId")
            VALUES ($1, $2);`,
            [post, hashtag]
        );
};

export {
    getHashtagByName,
    insertHashtag,
    updateHashtagCount,
    getTrendingHashtags
}