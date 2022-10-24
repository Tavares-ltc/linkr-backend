import connection from "../database/postgres.js";

const TABLE = 'hashtags';

async function getHashtagByName(hashtag) {
    return await connection.query('SELECT * FROM hashtags WHERE name = $1;', [hashtag]);
}

async function getTrendingHashtags() {
    const hashtags = await connection.query(
        `SELECT ${TABLE}.id, ${TABLE}.name, COUNT("postsHashtags".id) AS occurrences
        FROM ${TABLE}
        JOIN "postsHashtags" 
        ON ${TABLE}.id = "postsHashtags"."hashtagId"
        GROUP BY ${TABLE}.name, ${TABLE}.id
        ORDER BY occurrences DESC
        LIMIT 10;`
    );

    return hashtags;
};

async function insertHashtag(name) {
        return await connection.query(
            `INSERT INTO ${TABLE} (name)
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
    insertHashtag,
    updateHashtagCount,
    getTrendingHashtags,
    getHashtagByName
}