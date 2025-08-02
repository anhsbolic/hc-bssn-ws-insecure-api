const crypto = require('crypto')
const {generateAccessToken} = require('../utils/jwt')
/** @type {import('pg').Pool} */
const pool = require("../db");

async function loginUser(body) {
    const {email, password} = body;
    const user = await pool.query(`SELECT *
                                   FROM users
                                   WHERE username = '${email}'
                                     AND password = '${password}'`);
    if (user.rowCount === 0) {
        throw new Error('Invalid email or password')
    }


    const jwtPayload = {
        id: user.rows[0].id,
        username: user.rows[0].username,
        role: user.rows[0].role
    }

    const accessToken = generateAccessToken(jwtPayload, '15m')
    const refreshToken = crypto.randomBytes(32).toString('hex')

    await pool.query(`INSERT INTO refresh_tokens (user_id, token, expires_at, created_at)
                      VALUES ($1, $2, NOW() + INTERVAL '7 days', NOW())
                      RETURNING *`, [user.rows[0].id, refreshToken])

    return {accessToken, refreshToken}
}

function refreshAccessToken(refreshToken) {

}

function logoutUser(refreshToken) {
}

function validateRefreshToken(refreshToken) {
}

module.exports = {
    loginUser,
    refreshAccessToken,
    logoutUser,
    validateRefreshToken
}
