import { connection } from "../database/db.js";

const TABLE = 'hashtags';

async function getTrendingHashtags() {
    const hashtags = await connection.query(
        `SELECT ${TABLE}.name, COUNT("postsHashtags".id) AS occurrences
        FROM ${TABLE}
        JOIN "postsHashtags" 
        ON ${TABLE}.id = "postsHashtags"."hashtagId"
        GROUP BY ${TABLE}.name
        ORDER BY occurrences DESC
        LIMIT 10;`
    );

    return hashtags;
};

async function insertHashtag(name) {
        return await connection.query(
            `INSERT INTO ${TABLE} (name)
            VALUES ($1);`,
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
    insertHashtag,
    updateHashtagCount,
    getTrendingHashtags
}