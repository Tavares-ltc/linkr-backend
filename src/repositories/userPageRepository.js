import connection from "../database/db.js";

async function getUserById({userId}){
    const userData = (await connection.query(`SELECT id, name, "createdAt", image FROM users WHERE id = $1;`,[userId]));
    return userData
}

export {
    getUserById
}