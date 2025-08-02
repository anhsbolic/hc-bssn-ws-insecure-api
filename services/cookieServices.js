const crypto = require('crypto')
const {generateAccessToken} = require('../utils/jwt')
/** @type {import('pg').Pool} */
const pool = require("../db");

async function loginUser(body) {
    const {email, password} = body;
    const user = await pool.query(
        'SELECT * FROM users WHERE username = $1 AND password = $2',
        [email, password]
    )
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

async function refreshAccessToken(userId, oldToken) {
    const result = await pool.query(
        `SELECT *
         FROM refresh_tokens
         WHERE token = $1
           AND user_id = $2
           AND expires_at > NOW()`,
        [oldToken, userId]
    )
    if (result.rowCount === 0) return null

    const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId])
    if (user.rowCount === 0) {
        throw new Error('User not found')
    }

    await pool.query('DELETE FROM refresh_tokens WHERE token = $1', [oldToken])

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
