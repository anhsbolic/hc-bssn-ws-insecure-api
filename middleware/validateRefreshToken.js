const pool = require('../db')

async function validateRefreshToken(req, res, next) {
    try {
        const refreshToken = req.cookies.refresh_token
        if (!refreshToken) {
            return res.status(401).json({message: 'Missing refresh token'})
        }

        const result = await pool.query(
            `SELECT *
             FROM refresh_tokens
             WHERE token = $1
               AND expires_at > NOW()`,
            [refreshToken]
        )

        if (result.rowCount === 0) {
            return res.status(401).json({message: 'Invalid or expired refresh token'})
        }

        // Simpan data user di request untuk dipakai di controller
        req.userId = result.rows[0].user_id
        req.refreshToken = refreshToken

        next()
    } catch (err) {
        console.error('Validate refresh token error:', err)
        res.status(500).json({message: 'Internal server error'})
    }
}

module.exports = validateRefreshToken
