const pool = require("../../config/db.js");

const findUserByEmail = async (email) => {
    const query = `SELECT * from users where email = $1`;

    const result = await pool.query(query, [email]);

    return result.rows[0];
};

const createUser = async (name, email, password) => {
    const query = `
        INSERT INTO users (
        name, 
        email, 
        password
        )
        VALUES(
        $1,
        $2,
        $3
        )
        RETURNING *
    `;
    const result = await pool.query(query, [
        name,
        email,
        password
    ]);
    return result.rows[0]
};
module.exports = {
    findUserByEmail,
    createUser
};